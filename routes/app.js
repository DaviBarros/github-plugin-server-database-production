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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const analysisController_1 = __importDefault(require("../controllers/analysisController"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
// criando conexão com o banco de dados
mongoose_1.default.connect(config_1.connectionString, {
    dbName: "analysisOutputs"
});
const db = mongoose_1.default.connection;
db.on("error", (err) => console.log(err));
db.once("connected", () => console.log("Connected to database"));
const analysisController = new analysisController_1.default();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, cors_1.default)());
app.get("/codeReviewT", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("oi");
}));
app.get("/codeReview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.query.owner;
    const repo = req.query.repo;
    const pull_number = req.query.pull_number;
    if (!owner)
        return res.status(400).send("Bad request: owner not provided");
    if (pull_number && !repo)
        return res.status(400).send("Bad request: repo not provided");
    try {
        let analysis;
        if (owner && repo && pull_number) {
            analysis = yield analysisController
                .getAnalysis(repo, owner, parseInt(pull_number))
                .then((analysis) => JSON.stringify(analysis));
        }
        else if (owner && repo) {
            analysis = yield analysisController
                .getAllAnalysisFromRepo(repo, owner)
                .then((analysis) => JSON.stringify(analysis));
        }
        else {
            analysis = yield analysisController
                .getAllAnalysisFromOwner(owner)
                .then((analysis) => JSON.stringify(analysis));
        }
        return res.send(analysis);
    }
    catch (error) {
        console.log(error);
        return res.status(404).send("Analysis not found");
    }
}));
app.post("/codeReview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.codeReview)
        return res.status(400).send("Bad request: analysis not provided");
    console.log("post aqui");
    const codeReview = req.body.codeReview;
    try {
        const createdAnalysis = yield analysisController
            .createAnalysis(codeReview)
            .then((codeReview) => JSON.stringify(codeReview));
        res.send(createdAnalysis);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send("Analysis not created");
    }
}));
app.put("/codeReview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.analysis)
        return res.status(400).send("Bad request: analysis not provided");
    const analysis = req.body.analysis;
    try {
        const updatedAnalysis = yield analysisController
            .updateAnalysis(analysis)
            .then((analysis) => JSON.stringify(analysis));
        res.send(updatedAnalysis);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send("Analysis not updated");
    }
}));
app.delete("/codeReview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.query.owner;
    const repo = req.query.repo;
    const pull_number = req.query.pull_number;
    if (!owner)
        return res.status(400).send("Bad request: owner not provided");
    if (pull_number && !repo)
        return res.status(400).send("Bad request: repo not provided");
    try {
        yield analysisController
            .deleteAnalysis(repo, owner, parseInt(pull_number))
            .then((analysis) => JSON.stringify(analysis));
        return res.send();
    }
    catch (error) {
        console.log(error);
        return res.status(404).send("Analysis not found");
    }
}));
exports.default = app;
