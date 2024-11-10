const { submitQuery } = require('../utils/model');
const Answer = require('../models/answerModel');
const responseModel = require('../models/responseModel');
const { createChatSession } = require('../utils/createSession');
const { collegeSuggestion } = require('../utils/collegeSuggestion');
const { courseSuggestion } = require('../utils/courseSuggestion');
const { suggestCareerPath } = require('../utils/carrierPathSuggestion');

const getResponse = async (req, res) => {
    try {
        const answers = await Answer.findOne({ _id: req.body.answerId });
        if (!answers) {
            return res.status(404).json({ success: false, status: 404, message: "No answers found", data: null });
        }

        const answerObject = JSON.stringify(answers.answer[0]);
        const query = `Given the individual's profile: ${answerObject}. Recommend a suitable career path and explain why. Do not add any other characters other than response.`;
        
        const response = await submitQuery(query, await createChatSession());
        
        if (!response) {
            return res.status(404).json({ success: false, status: 404, message: "No response found", data: null });
        }
            const [collegeSessionId, courseSessionId, careerPathSessionId] = await Promise.all([
                createChatSession(),
                createChatSession(),
                createChatSession()
            ]);
            const [collegeSuggestionData, courseSuggestionData, careerPathData] = await Promise.all([
                collegeSuggestion(collegeSessionId, response),
                courseSuggestion(courseSessionId, response),
                suggestCareerPath(careerPathSessionId, response)
            ]);
        const completeResult = {
            modelResponse: response,
            collegeSuggestion: collegeSuggestionData,
            courseSuggestion: courseSuggestionData,
            careerPath: careerPathData
        };
        const responseData = await responseModel.create({ userId: req.body._id, response: completeResult });
        if (!responseData) {
            return res.status(404).json({ success: false, status: 404, message: "Response not saved.", data: null });
        }

        return res.status(200).json({ success: true, status: 200, message: "Response fetched successfully", data: completeResult });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: 'Internal Server error: ' + error.message, data: null });
    }
};

const getResponseById = async (req, res) => {
    try {
        const response = await responseModel.findOne({ _id: req.params.id });
        if (!response) {
            return res.status(404).json({ success: false, status: 404, message: "No response found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Response fetched successfully","data":response.response});
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: 'Internal Server error: ' + error.message, data: null });
    }
};

const getPastResult= async (req, res) => {
    try {
        const {_id}=req.body
        const response = await responseModel.find({userId:_id});
        if(!response){
            return res.status(404).json({ success: false, status: 404, message: "No response found", data: null });
        }
        return res.status(200).json({ success: true, status: 200, message: "Response fetched successfully","data":response});
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: 'Internal Server error: ' + error.message, data: null });
        
    }
};

module.exports = { getResponse, getResponseById,getPastResult};
