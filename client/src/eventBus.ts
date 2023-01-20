interface ISubscription {
  eventName: string;
  subscriptors: any[];
}

const subscriptions: ISubscription[] = []

export const eventBus = {
  emit: (eventName: string) => {
    subscriptions
    .find(subscription => subscription.eventName === eventName)?.subscriptors
    .forEach(subscriptor => {
      subscriptor()
    })
  },
  subscribe: (eventName: string, subscriptor: any) => {
    if (!subscriptions.some(subscription => subscription.eventName === eventName)) {
      subscriptions.push({
        eventName,
        subscriptors: [subscriptor]
      })
    } else {
      subscriptions
      .find(subscription => subscription.eventName === eventName)?.subscriptors
      .push(subscriptor)
    }
  }
}
