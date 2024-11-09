"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const CodeReviewRepository_1 = require("../data/CodeReviewRepository");
const CodeReview_1 = require("../models/CodeReview");
let analysisOutputRepository = config_1.persistenceType === "mongo" ? new CodeReviewRepository_1.CodeReviewMongoRepository() : new CodeReviewRepository_1.CodeReviewMongoRepository();
class AnalysisController {
    async getAnalysis(repo, owner, pull_number) {
        return await analysisOutputRepository.getCodeReview(repo, owner, pull_number);
    }
    async getAllAnalysisFromRepo(repo, owner) {
        return await analysisOutputRepository.listAllAnalysisFromRepo(repo, owner);
    }
    async getAllAnalysisFromOwner(owner) {
        return await analysisOutputRepository.listAllAnalysisFromOwner(owner);
    }
    async createAnalysis(analysis) {
        const newAnalysis = new CodeReview_1.CodeReview(analysis);
        return await analysisOutputRepository.createCodeReview(newAnalysis);
    }
    async updateAnalysis(analysis) {
        const newAnalysis = new CodeReview_1.CodeReview(analysis);
        return await analysisOutputRepository.updateCodeReview(newAnalysis);
    }
    async deleteAnalysis(repo, owner, pull_number) {
        return await analysisOutputRepository.deleteCodeReview(repo, owner, pull_number);
    }
}
exports.default = AnalysisController;
