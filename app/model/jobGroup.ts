import jobGroupRates from "@/app/model/jobGroupRates";

export default class JobGroup {
    static rateForGroup(name: string): number | undefined {
        return jobGroupRates.get(name);
    }
}