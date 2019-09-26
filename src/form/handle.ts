import { Response, Request } from 'express';
import { Resource, Type } from '../global/dataTypes';
import GLOBAL, { AddNewResource } from '../global/dataStore';

const PostResource = (req: Request, res: Response) => {
  const { body } = req;
  const { type, link, title, description, tags } = body;
  const newResource: Resource = {
    type,
    link,
    title,
    description,
    tags,
    icon: GLOBAL.iconMap[type as Type]
  };
  if (!type || !link) {
    res.status(400).json({
      id: 'InvalidParams',
      message: 'The supplied parameters are invalid'
    });
    return;
  }
  if (!Object.values(Type).includes(type)) {
    res.status(404).json({
      id: 'InvalidType',
      message: 'The supplied resource type does not exist'
    });
  }
  // todo: validate link
  if (!description) {
    newResource.description = '';
  }
  let status = 201;
  try {
    status = AddNewResource(newResource);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (status !== 201) {
    res.status(status).send();
    return;
  }
  res
    .status(status)
    .json({ id: 'OK', message: 'successfully added new resource' });
};

export default PostResource;
