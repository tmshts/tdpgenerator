import {Human, Agent, PhysicalWork, Location, Supervision, Transfer, Modality} from './constructs.js'
import {check_incompatibilities} from './error_handler.js';
import {getRadioValue, getCheckValue} from './etc.js';

document.addEventListener('DOMContentLoaded', function() {

    // related_work_id
    const related_work_id = document.querySelector('#related_work_id');
    if (related_work_id){
        related_work_id.addEventListener('click', () => handle_related_work());
        }

    // use_case_id
    const use_case_id = document.querySelector('#use_case_id');
    if (use_case_id){
        use_case_id.addEventListener('click', () => handle_use_case());
        }

    // home_id
    const home_id = document.querySelector('#home_id');
    if (home_id){
        home_id.addEventListener('click', () => handle_home());
    }

    // Filter
    const filter = document.querySelector('#select_dimensions');
    if (filter){
        filter.addEventListener('click', () => handle_filter());
        }

    const error_message = document.querySelector('#error_message');

    const downloadSVG = document.querySelector('#downloadSVG');
    downloadSVG.addEventListener('click', downloadSVGA);

    function downloadSVGA() {
        const svg = document.querySelector('#svg');
        const w = parseInt(600);
        const h = parseInt(370);
        svg.setAttribute('width', w);
        svg.setAttribute('height', h);
        const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
        const a = document.createElement('a');
        const even = new MouseEvent('click');
        a.download = 'generated_tdp.svg';
        a.href = 'data:image/svg+xml;base64,' + base64doc;
        a.dispatchEvent(even);
    }

    function handle_home() {
        const home_id = document.querySelector('#home_id');
        home_id.classList.add("active");
        const related_work_id = document.querySelector('#related_work_id');
        related_work_id.classList.remove("active");
        const use_case_id = document.querySelector('#use_case_id');
        use_case_id.classList.remove("active");

        // Show dimensions and picture
        const home = document.querySelector('.home');
        home.style.display = 'block';

        // Hide Related Works
        const related_works = document.querySelector('.related_works');
        related_works.style.display = 'none';

        // Hide Related Works
        const use_case = document.querySelector('.use_case');
        use_case.style.display = 'none';
    }

    function handle_use_case() {
        const use_case_id = document.querySelector('#use_case_id');
        use_case_id.classList.add("active");
        const related_work_id = document.querySelector('#related_work_id');
        related_work_id.classList.remove("active");
        const home_id = document.querySelector('#home_id');
        home_id.classList.remove("active");

        // Show use case
        const use_case = document.querySelector('.use_case');
        use_case.style.display = 'block';

        // Hide Related Works
        const related_works = document.querySelector('.related_works');
        related_works.style.display = 'none';

        // Hide Home
        const home = document.querySelector('.home');
        home.style.display = 'none';
    }

    function handle_related_work() {
        const related_work_id = document.querySelector('#related_work_id');
        related_work_id.classList.add("active");
        const home_id = document.querySelector('#home_id');
        home_id.classList.remove("active");
        const use_case_id = document.querySelector('#use_case_id');
        use_case_id.classList.remove("active");
     
        // Show Related Works
        const related_works = document.querySelector('.related_works');
        related_works.style.display = 'block';

        // Hide dimensions and picture
        const home = document.querySelector('.home');
        home.style.display = 'none';

        // Hide use case
        const use_case = document.querySelector('.use_case');
        use_case.style.display = 'none';
    }
    
    function handle_filter() {
        // Hide Filter Button
        document.querySelector('#select_dimensions').style.display = 'none';
        // Show Filter Div
        document.querySelector('#filter_div').style.display = 'block';
        document.querySelector('.filter_cancel').addEventListener('click', () => {
        // Show Select Dimensions Button
        document.querySelector('#select_dimensions').style.display = 'block';
        // Hide Filter Div
        document.querySelector('#filter_div').style.display = 'none'; 
        });

        document.querySelector('.filter_save').addEventListener('click', () => {
            let svg = document.querySelector('#svg');
            // After clicking on generate svg canvas becomes empty
            svg.innerHTML = ""
            // Error message is deleted
            error_message.innerHTML = ''
            // Variables from user input
            let jointWork = getRadioValue('#joint_physical_work');
            let humanPhy = getRadioValue('#human_physical_work');
            let agentPhy = getRadioValue('#agent_physical_work');
            let humanCogni = getRadioValue("#human_cognitive_work");
            let agentCogni = getRadioValue("#agent_cognitive_work");
            let gestures = getRadioValue("#hand_gestures");
            let handover = getRadioValue("#handover");
            let teacher  = getRadioValue("#teacher");
            let question = getRadioValue("#question");
            let feedback = getRadioValue("#feedback");

            // making sure that arms are lifted in case of any physical work
            let humanEngagement    = (gestures == 'yes') ? 'gesture' : (jointWork != 'none' || humanPhy != 'none') ? 'physical' :  'none';
            let agentArm  = (jointWork != 'none' || agentPhy != 'none') ? 'physical' :  'none';

            check_incompatibilities(humanPhy, jointWork, gestures, agentPhy, handover)
            if(error_message.innerHTML.length > 0) {return}
            
           
           
            if(error_message.innerHTML.length > 0) {return}

            // array of drawing instructions
            const elements = []

            // add actors with cognitive Work
            const left = {'x': 150, 'y': 141}
            const right = {'x':405, 'y': 141}
            const human = new Human(left, humanCogni, humanEngagement)
            const agent = new Agent(right, agentCogni, agentArm)
            elements.push(...human.create())
            elements.push(...agent.create())
            
            // add physical work
            let w = 140, h = 40;
            if(jointWork != 'none') {
                //shared
                elements.push(new PhysicalWork({'x': left['x'] - w/2, 'y':left['y'] - (h + 55)}, 420, 40, jointWork))
            } 
            if(humanPhy != 'none') {
                elements.push(new PhysicalWork({'x': left['x'] - w/2, 'y':left['y'] - (h + 55)}, 140, 40, humanPhy))
            }
            if(agentPhy != 'none') {
                elements.push(new PhysicalWork({'x': right['x']- w/2, 'y':right['y'] - (h + 55)}, 140, 40, agentPhy))
            }


            /// Add Location
            if(getRadioValue('#location') == 'physical_proximity') {
                elements.push(new Location({'x': left['x'] - 60, 'y': left['y'] + 120 }, 400, 10))
            } else {
                elements.push(new Location({'x': left['x'] - 60, 'y': left['y'] + 120}, 120, 10))
                elements.push(new Location({'x': right['x'] - 60, 'y': right['y'] + 120}, 120, 10))
            }

            /// Add Supervision
            let toLeft = getRadioValue("#supervision_starter") == 'agent';
            let rank = document.getElementById("supervision_level").value - 1; // bc array index starts at 0 
            const supervision = new Supervision(left);
            elements.push(...supervision.create(rank, toLeft));
            
            /// Add additional arrows besides supervision
            const transfer = new Transfer(left);
            for(const [i, val] of [handover, teacher, question, feedback].entries()){
                if(val == 'none') {continue;}
                let toLeft = (val == 'agent');
                elements.push(...transfer.create(i,toLeft))
            }

            // add modalities
            const modality = new Modality(left,right);
            elements.push(...modality.create(getCheckValue(".communication_modalities")))

            // draw all instructions
            for (const e of elements) {
                svg.appendChild(e.draw());
            }

            // Show Select Dimensions Button
            document.querySelector('#select_dimensions').style.display = 'block';
            // Hide Filter Div
            document.querySelector('#filter_div').style.display = 'none'; 
        });
    }
})


