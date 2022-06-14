import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "./helpers";
import {Model} from "mongoose";
import {ReasonDocument} from "./request/schema/reason.schema";
import {ClaimDocument} from "./request/schema/claim.schema";

@Injectable()
export class AppService {

    constructor(
        @InjectModel(ModelName.REASON) private readonly reasonModel: Model<ReasonDocument>,
        @InjectModel(ModelName.CLAIM) private readonly claimModel: Model<ClaimDocument>,
    ) {
    }

    getReasons() {
        return this.reasonModel.find();
    }

    getClaim() {
        return this.claimModel.find()
    }
}