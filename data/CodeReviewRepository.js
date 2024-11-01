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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeReviewMongoRepository = void 0;
const CodeReview_1 = __importDefault(require("../models/CodeReview"));
class CodeReviewMongoRepository {
    constructor() {
        this.db = CodeReview_1.default;
    }
    getCodeReview(repo, owner, pull_number) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.db.findOne({ repository: repo, owner, pull_number }, { projection: { _id: 0 } });
            if (!analysis)
                throw new Error("Analysis output not found");
            console.log("Found: ", analysis);
            return analysis;
        });
    }
    createCodeReview(analysisOutput) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.create(analysisOutput);
            console.log("Created: ", analysisOutput);
            return analysisOutput;
        });
    }
    updateCodeReview(newCodeReview) {
        return __awaiter(this, void 0, void 0, function* () {
            const { repository, owner, pull_number } = newCodeReview;
            const a = yield this.db.updateOne({ repository, owner, pull_number }, { $set: newCodeReview });
            if (!a.acknowledged)
                throw new Error("Failed to update analysis output");
            console.log("Updated: ", newCodeReview);
            return newCodeReview;
        });
    }
    deleteCodeReview(repo, owner, pull_number) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.deleteOne({ repository: repo, owner, pull_number });
            console.log("Deleted: ", { repository: repo, owner, pull_number });
        });
    }
    listAllAnalysisFromRepo(repo, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const analyses = yield this.db.find({ repository: repo, owner }, { projection: { _id: 0 } });
            console.log("Found: ", analyses);
            return analyses;
        });
    }
    listAllAnalysisFromOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const analyses = yield this.db.find({ owner }, { projection: { _id: 0 } });
            console.log("Found: ", analyses);
            return analyses;
        });
    }
}
exports.CodeReviewMongoRepository = CodeReviewMongoRepository;
