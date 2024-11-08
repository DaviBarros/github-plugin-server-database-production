"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeReviewMongoRepository = void 0;
const CodeReview_1 = __importDefault(require("../models/CodeReview"));
class CodeReviewMongoRepository {
    db = CodeReview_1.default;
    async getCodeReview(repo, owner, pull_number) {
        const analysis = await this.db.findOne({ repository: repo, owner, pull_number }, { projection: { _id: 0 } });
        if (!analysis)
            throw new Error("Analysis output not found");
        console.log("Found: ", analysis);
        return analysis;
    }
    async createCodeReview(analysisOutput) {
        await this.db.create(analysisOutput);
        console.log("Created: ", analysisOutput);
        return analysisOutput;
    }
    async updateCodeReview(newCodeReview) {
        const { repository, owner, pull_number } = newCodeReview;
        const a = await this.db.updateOne({ repository, owner, pull_number }, { $set: newCodeReview });
        if (!a.acknowledged)
            throw new Error("Failed to update analysis output");
        console.log("Updated: ", newCodeReview);
        return newCodeReview;
    }
    async deleteCodeReview(repo, owner, pull_number) {
        await this.db.deleteOne({ repository: repo, owner, pull_number });
        console.log("Deleted: ", { repository: repo, owner, pull_number });
    }
    async listAllAnalysisFromRepo(repo, owner) {
        const analyses = await this.db.find({ repository: repo, owner }, { projection: { _id: 0 } });
        console.log("Found: ", analyses);
        return analyses;
    }
    async listAllAnalysisFromOwner(owner) {
        const analyses = await this.db.find({ owner }, { projection: { _id: 0 } });
        console.log("Found: ", analyses);
        return analyses;
    }
}
exports.CodeReviewMongoRepository = CodeReviewMongoRepository;
