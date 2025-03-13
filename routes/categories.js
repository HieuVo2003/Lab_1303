var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/categories');
let { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');

/* GET tất cả categories */
router.get('/', async function(req, res, next) {
    try {
        let categories = await categoryModel.find();
        CreateSuccessRes(res, categories, 200);
    } catch (error) {
        next(error);
    }
});

/* GET category theo ID */
router.get('/:id', async function(req, res, next) {
    try {
        let category = await categoryModel.findById(req.params.id);
        if (!category) {
            return CreateErrorRes(res, "Danh mục không tồn tại", 404);
        }
        CreateSuccessRes(res, category, 200);
    } catch (error) {
        next(error);
    }
});

/* POST tạo mới category */
router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = new categoryModel({
            name: body.name
        });
        await newCategory.save();
        CreateSuccessRes(res, newCategory, 201);
    } catch (error) {
        next(error);
    }
});

/* PUT cập nhật category */
router.put('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let body = req.body;
        let updatedInfo = {};

        if (body.name) {
            updatedInfo.name = body.name;
        }

        let updatedCategory = await categoryModel.findByIdAndUpdate(
            id, updatedInfo, { new: true }
        );

        if (!updatedCategory) {
            return CreateErrorRes(res, "Danh mục không tồn tại", 404);
        }

        CreateSuccessRes(res, updatedCategory, 200);
    } catch (error) {
        next(error);
    }
});

/* DELETE category (xóa mềm - soft delete) */
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let deletedCategory = await categoryModel.findByIdAndUpdate(
            id, { isDeleted: true }, { new: true }
        );

        if (!deletedCategory) {
            return CreateErrorRes(res, "Danh mục không tồn tại", 404);
        }

        CreateSuccessRes(res, deletedCategory, 200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
