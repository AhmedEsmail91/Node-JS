import {allNotes,addNote,updateNote,deleteNote} from "./note.controller.js";
import { Router } from "express";
import {auth} from "../../middlewares/auth.js";
const noteRouter=Router();

noteRouter.route("/notes").post(addNote);
noteRouter.route("/notes/:id").put(updateNote).delete(deleteNote);
noteRouter.route("/notes").get(auth,allNotes);

export default noteRouter;
