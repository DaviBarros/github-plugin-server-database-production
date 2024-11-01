"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const CodeReviewRepository_1 = require("../data/CodeReviewRepository");
const CodeReview_1 = require("../models/CodeReview");
let analysisOutputRepository = config_1.persistenceType === "mongo" ? new CodeReviewRepository_1.CodeReviewMongoRepository() : new CodeReviewRepository_1.CodeReviewMongoRepository();
class AnalysisController {
    getAnalysis(repo, owner, pull_number) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield analysisOutputRepository.getCodeReview(repo, owner, pull_number);
        });
    }
    getAllAnalysisFromRepo(repo, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield analysisOutputRepository.listAllAnalysisFromRepo(repo, owner);
        });
    }
    getAllAnalysisFromOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield analysisOutputRepository.listAllAnalysisFromOwner(owner);
        });
    }
    createAnalysis(analysis) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAnalysis = new CodeReview_1.CodeReview(analysis);
            return yield analysisOutputRepository.createCodeReview(newAnalysis);
        });
    }
    updateAnalysis(analysis) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAnalysis = new CodeReview_1.CodeReview(analysis);
            return yield analysisOutputRepository.updateCodeReview(newAnalysis);
        });
    }
    deleteAnalysis(repo, owner, pull_number) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield analysisOutputRepository.deleteCodeReview(repo, owner, pull_number);
        });
    }
}
exports.default = AnalysisController;
