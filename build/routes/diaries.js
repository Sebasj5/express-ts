"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryServices_1 = require("../services/diaryServices");
const router = express_1.default.Router();
const isString = (text) => typeof text === 'string' || text instanceof String;
const isDate = (date) => Boolean(Date.parse(date));
const isWeather = (param) => ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(param);
const isVisibility = (param) => ['great', 'good', 'ok', 'poor'].includes(param);
const toNewDiaryEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid user data');
    }
    if (!isString(object.date) ||
        !isDate(object.date) ||
        !isWeather(object.weather) ||
        !isVisibility(object.visibility) ||
        !isString(object.comments)) {
        throw new Error('Missing or invalid fields');
    }
    return {
        date: object.date,
        weather: object.weather,
        visibility: object.visibility,
        comments: object.comments
    };
};
router.get('/', (_req, res) => {
    res.json((0, diaryServices_1.getEntriesWithoutSensitiveInfo)());
});
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).send({ error: 'Id should be a number' });
    }
    const diary = (0, diaryServices_1.findById)(id);
    return diary
        ? res.json(diary)
        : res.sendStatus(404);
});
router.post('/', (req, res) => {
    try {
        const newEntry = toNewDiaryEntry(req.body);
        const added = (0, diaryServices_1.addEntry)(newEntry);
        res.status(201).json(added);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
});
exports.default = router;
//# sourceMappingURL=diaries.js.map