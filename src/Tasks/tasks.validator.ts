import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is required')
    .trim()
    .isString()
    .withMessage('Title should be in text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is required')
    .isString()
    .withMessage('The date should be in a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('The description should be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.low, Priority.normal, Priority.high])
    .withMessage('Priority can only be low, normal or high'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be todo, inProgress, completed')
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required')
    .trim()
    .isString()
    .withMessage('The task id should be in string format'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be todo, inProgress, completed')
];
