"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeReview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class CodeReview {
    constructor(codeReview) {
        this.uuid = codeReview.uuid,
            this.repository = codeReview.repository,
            this.owner = codeReview.owner,
            this.pull_number = codeReview.pull_number,
            this.base_a = codeReview.base_a,
            this.base_b = codeReview.base_b,
            this.base_merge = codeReview.base_merge,
            this.branch_a = codeReview.branch_a,
            this.branch_b = codeReview.branch_b;
    }
}
exports.CodeReview = CodeReview;
// Define the schema for the analysis output
const codeReviewSchema = new mongoose_1.default.Schema({
    uuid: String,
    repository: String,
    owner: String,
    pull_number: Number,
    base_a: String, // persiste a diferença entre o código do base e branch_a
    base_b: String, // persiste a diferença entre o código do base e branch_b
    base_merge: String, // persiste a diferença entre o código do base o merge do branch_a e branch_b  
    branch_a: String, //nome do branch a
    branch_b: String // nome do branch b
});
exports.default = mongoose_1.default.models.RevisaodeCodigo || mongoose_1.default.model("RevisaodeCodigo", codeReviewSchema);
