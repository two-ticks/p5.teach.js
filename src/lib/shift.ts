//only works if object has been added to the scene
export function shift(_object: any, x: number, y: number) {
  _object.x = x;
  _object.y = y;
  if (_object.writeTexElement) {
    _object.writeTexElement.position(_object.x, _object.y);
  }
  else if(_object.writeTextElement){
    _object.writeTextElement.position(_object.x, _object.y);
  }
}
