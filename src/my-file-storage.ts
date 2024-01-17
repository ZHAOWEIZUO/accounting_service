/*
 * @Author: zwz
 * @Date: 2024-01-16 15:59:16
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-16 15:59:17
 * @Description: 请填写简介
 */
import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync('uploads');
    } catch (e) {}

    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

export { storage };
