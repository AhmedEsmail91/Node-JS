import {allNotes,addNote,updateNote,deleteNote} from "./note.controller.js";
import { Router } from "express";
const noteRouter=Router();

noteRouter.route("/notes/:id").post(addNote);
noteRouter.route("/notes/:id").put(updateNote).delete(deleteNote);
noteRouter.route("/notes").get(allNotes);

export default noteRouter;
