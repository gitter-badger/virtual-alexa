import * as fs from "fs";
import {BuiltinSlotTypes} from "./BuiltinSlotTypes";
import {IntentSchema} from "./IntentSchema";
import {SampleUtterances} from "./SampleUtterances";
import {SlotTypes} from "./SlotTypes";

/**
 * Parses and interprets an interaction model
 * Takes in intentName schema and sample utterances from files
 * Then can take a phrase and create an intentName request based on it
 */
export class InteractionModel {

    // Parse the all-in-one interaction model as a file
    public static fromFile(interactionModelFile: any): InteractionModel {
        const data = fs.readFileSync(interactionModelFile);
        const json = JSON.parse(data.toString());
        return InteractionModel.fromJSON(json);
    }

    // Parse the all-in-one interaction model as JSON
    // Using this for reference:
    //  https://github.com/alexa/skill-sample-nodejs-team-lookup/blob/master/speech-assets/interaction-model.json
    public static fromJSON(interactionModel: any): InteractionModel {
        const schemaJSON: any = {
            intents: [],
        };
        const sampleJSON: any = {};

        const intents = interactionModel.intents;
        for (const intent of intents) {
            // The name of the intent is on the property "name" instead of "intent" for the unified model
            intent.intent = intent.name;
            schemaJSON.intents.push(intent);
            if (intent.samples) {
                sampleJSON[intent.intent] = intent.samples;
            }
        }

        let slotTypes;
        if (interactionModel.types) {
            slotTypes = new SlotTypes(interactionModel.types);
        }
        const schema = new IntentSchema(schemaJSON);
        const samples = SampleUtterances.fromJSON(sampleJSON);

        return new InteractionModel(schema, samples, slotTypes);
    }

    public constructor(public intentSchema: IntentSchema,
                       public sampleUtterances: SampleUtterances,
                       public slotTypes?: SlotTypes) {
        if (!this.slotTypes) {
            this.slotTypes = new SlotTypes([]);
        }
        this.slotTypes.addTypes(BuiltinSlotTypes.values());
        sampleUtterances.interactionModel = this;
    }

    public hasIntent(intent: string): boolean {
        return this.intentSchema.hasIntent(intent);
    }
}
