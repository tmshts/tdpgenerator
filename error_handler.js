function check_incompatibilities(humanPhy, jointWork, gestures, agentPhy, handover) {
    if ((humanPhy == "direct" || humanPhy == 'indirect') && 
    (jointWork =="direct" || jointWork =="indirect")) {
    error_message.innerHTML = `Human can not perform physical work individually 
    and share physical work with the Agent at the same time.`
    }
    if (((humanPhy == "direct" || humanPhy == "indirect") ||
        (jointWork =="direct" || jointWork =="indirect")) && gestures == "yes") {
        error_message.innerHTML = `Human can not perform physical work individually 
        or share physical work with the Agent and using hands for teleoperation at the same time.`
    }
    if ((agentPhy == "direct" || agentPhy == "indirect") && 
        (jointWork== "direct" || jointWork == "indirect")) {
        error_message.innerHTML += `<br> Agent can not perform physical work individually and share 
        physical work with the Human at the same time.`
    }
    if ((handover == "human" || handover == "agent") && (humanPhy == "none" && agentPhy == "none")) {
        error_message.innerHTML += `Handover of a physical object requires physical work of 
        the human and the agent.`
    }
    if ((handover == "human"  || handover=="agent") && (humanPhy=="none") && 
        (agentPhy == "direct" || agentPhy =="indirect")) {
        error_message.innerHTML += `Handover of a physical object requires physical work 
        of the human and the agent.`
    }
    if ((handover == "human" || handover == "agent") && (agentPhy == "none"  && 
    ( humanPhy == "direct" || humanPhy == "indirect"))) {
        error_message.innerHTML += `Handover of a physical object requires physical 
        work of the human and the agent.`
    }
}

export{check_incompatibilities};