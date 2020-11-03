import Modifier from 'ember-modifier';

//  <div class="foo" {{class this.className}} {{class color="red"}}>
//              foo  thingie                  color-red
export default class ClassModifier extends Modifier {

  classNames = []

  didReceiveArguments() {
    let { element, args: { positional, named }, classNames } = this;

    classNames.forEach(name => {
      element.classList.remove(name);
    })

    classNames = [];

    positional.forEach(name => {
      if(!name) {
        return;
      }
      classNames.push(name);
      element.classList.add(name);
    });

    for(let key in named) {
      let value = named[key];
      if(!value) {
        continue;
      }
      let name = `${key}-${value}`;
      classNames.push(name);
      element.classList.add(name);
    }

    this.classNames = classNames;
  }

}
