export interface Outcome {
    eventStage: Stage;

    offerTicketDelayLive: Number;
    offerTicketDelayUpcoming: Number;
  
    eventTicketDelayLive: Number;
    eventTicketDelayUpcoming: Number;
  
    sportTicketDelayLive: Number;
    sportTicketDelayUpcoming: Number;
};

export enum Stage {
    UPCOMING = 1,
    LIVE = 2,
}

// The delayCalculator function must 
// - receive an input of type Outcome Array
// - return an output of type Number
export type DelayCalculator = (input: Outcome[]) => Number;

const upcomingDelayCalcutor = (event) : number => {
        const delay  = Object.keys(event).filter(key => key.includes('Upcoming'))
            .map(key => event[key]).sort((a,b) => b -a)
        return delay[0]
}

const liveDelayCalcutor = (event) : number => {
    const delay  = Object.keys(event).filter(key => key.includes('Live'))
        .map(key => event[key]).sort((a,b) => b -a)
    return delay[0]
}

// Please put your code here
export const delayCalculator: DelayCalculator = (input) => {
    let delays =  []
    input.forEach((event) => {
        const eventStage = event.eventStage
        if(eventStage === Stage.UPCOMING) {
            delays.push(upcomingDelayCalcutor(event))
        }
        else if(eventStage === Stage.LIVE) {
            delays.push(liveDelayCalcutor(event))
        }
    })
    return delays.sort((a, b) => b -a)[0]
};