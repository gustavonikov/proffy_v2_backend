/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

import db from '../database/connections';
import convertHoursToMinutes from '../utils/format';

interface scheduleItem {
    week_day: number,
    from: string,
    to: string,
}

export default class ClassController {
    async index(request: Request, response: Response) {
        const filters = request.query;
        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'Missing filters to search classes',
            });
        }

        const convertTime = convertHoursToMinutes(time);

        const classes = await db('classes')
            // eslint-disable-next-line func-names
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [convertTime])
                    .whereRaw('`class_schedule`.`to` > ??', [convertTime]);
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
        } = request.body;

        const trsction = await db.transaction();

        try {
            const registeredUser = await trsction('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = registeredUser[0];

            const insertedClasses = await trsction('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClasses[0];

            const classSchedule = schedule.map((item: scheduleItem) => ({
                class_id,
                week_day: item.week_day,
                from: convertHoursToMinutes(item.from),
                to: convertHoursToMinutes(item.to),
            }));

            await trsction('class_schedule').insert(classSchedule);

            await trsction.commit();

            return response.status(201).send();
        } catch (error) {
            await trsction.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating a new class',
            });
        }
    }
}
