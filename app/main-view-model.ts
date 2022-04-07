import { Observable } from '@nativescript/core'
import { Frame } from '@nativescript/core'

export class HelloWorldModel extends Observable {
  open(args) {
    Frame.topmost().navigate({
      moduleName: 'volume-page',
      context: "",
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
  open2(args) {
    Frame.topmost().navigate({
      moduleName: 'square-page',
      context: "",
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
  open3(args) {
    Frame.topmost().navigate({
      moduleName: 'length-page',
      context: "",
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
  open4(args) {
    Frame.topmost().navigate({
      moduleName: 'mass-page',
      context: "",
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
  open5(args) {
    Frame.topmost().navigate({
      moduleName: 'currency-page',
      context: "",
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
}
