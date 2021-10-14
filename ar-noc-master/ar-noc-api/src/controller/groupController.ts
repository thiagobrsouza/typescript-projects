import { Router } from "express";
import { Group } from "../entity/Group";
import { GroupService } from "../service/GroupService";

export const groupRoute = Router();
const groupService = new GroupService();

groupRoute.post('/', async (req, res) => {
  const {name} = req.body;
  const newGroup = new Group(name);
  try {
    const group = await groupService.save(newGroup);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

groupRoute.get('/', async (req, res) => {
  const list = await groupService.find();
  res.status(200).json(list);
});

groupRoute.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const group = await groupService.findById(id);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

groupRoute.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {name} = req.body;
    const group = await groupService.update(id, name);
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

groupRoute.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await groupService.remove(id);
    return res.status(204).json([]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});