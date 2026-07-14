import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  sendMessage,
  getMessages,
} from "../services/message.service.js";

export const createMessage =
  asyncHandler(async (req, res) => {

    const message = await sendMessage(
      req.params.id,
      req.user.id,
      req.body.message
    );

    return successResponse(
      res,
      201,
      "Message sent successfully",
      message
    );

  });

export const fetchMessages =
  asyncHandler(async (req, res) => {

    const messages = await getMessages(
      req.params.id,
      req.user.id
    );

    return successResponse(
      res,
      200,
      "Messages fetched successfully",
      messages
    );

  });