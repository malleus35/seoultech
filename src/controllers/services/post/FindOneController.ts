import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";

import PostService from "@src/services/PostService";

import resTypes from "@src/utils/resTypes";
import Post from "@src/models/PostModel";

class FindOneController extends Controller {
    private result: Post | string;
    constructor() {
        super();
        this.result = "";
    }

    async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            this.result = await PostService.findOne(req);
        } catch (e: unknown) {
            this.result = "InternalServerError";
            console.log(e);
        }
    }

    async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        switch (this.result) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "CannotFindItem":
                resTypes.cannotFindItemRes(res, "user");
                break;
            default:
                resTypes.successRes(res, "특정 게시물 조회", this.result);
        }
    }
}

export default FindOneController;