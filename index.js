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

            let svgns = "http://www.w3.org/2000/svg";
            let svg = document.querySelector('#svg');

            // After clicking on generate svg canvas becomes empty
            svg.innerHTML = ""

            // Error message is deleted
            error_message.innerHTML = ''


            // Create Human Body
            // Right Part Body
            let human_body_right_neck = document.createElementNS(svgns, "path");
            human_body_right_neck.setAttribute("d", "M 158 140 C 170 145 180 160 183 170");
            human_body_right_neck.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
            svg.appendChild(human_body_right_neck);
            let human_body_right = document.createElementNS(svgns, "line");
            human_body_right.setAttributeNS(null, "x1", 183);
            human_body_right.setAttributeNS(null, "y1", 170);
            human_body_right.setAttributeNS(null, "x2", 183);
            human_body_right.setAttributeNS(null, "y2", 250);
            human_body_right.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            svg.appendChild(human_body_right);

            // Left Part Body
            let human_body_left_neck = document.createElementNS(svgns, "path");
            human_body_left_neck.setAttribute("d", "M 142 140 C 130 145 120 160 117 170");
            human_body_left_neck.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
            svg.appendChild(human_body_left_neck);
            let human_body_left = document.createElementNS(svgns, "line");
            human_body_left.setAttributeNS(null, "x1", 117);
            human_body_left.setAttributeNS(null, "y1", 170);
            human_body_left.setAttributeNS(null, "x2", 117);
            human_body_left.setAttributeNS(null, "y2", 250);
            human_body_left.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            svg.appendChild(human_body_left);

            // Bottom Part
            let human_body_bottom = document.createElementNS(svgns, "polyline");
            human_body_bottom.setAttribute("points", "117,250 183,250");
            human_body_bottom.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            svg.appendChild(human_body_bottom);

            // Human Cognitive Work
            const human_cognitive_work_value = document.getElementsByName('human_cognitive_work');

            function human_cognitive_work_function(check_value) {
                //console.log(check_value)
                for (i = 0; i < human_cognitive_work_value.length; i++) {
                    if (human_cognitive_work_value[i].checked) {
                        let val = human_cognitive_work_value[i].value
                        //console.log(val)
                        if (human_cognitive_work_value[i].value == check_value) {
                            //console.log(check_value)
                            return true
                        } 
                    }
                }
            }

            let human_cognitive_work = document.createElementNS(svgns, "circle");
            human_cognitive_work.setAttributeNS(null, "cx", 150);
            human_cognitive_work.setAttributeNS(null, "cy", 120);
            human_cognitive_work.setAttributeNS(null, "r",  21);

            if (human_cognitive_work_function("direct"))
            {
                human_cognitive_work.setAttributeNS(null, 'style', 'fill: blue; stroke: black; stroke-width: 2px;' );
            }
            else if (human_cognitive_work_function("indirect")) {
                human_cognitive_work.setAttributeNS(null, 'style', 'fill: lightblue; stroke: black; stroke-width: 2px;' );
            }
            svg.appendChild(human_cognitive_work);

            // Rectangle For Joint Physical Work
            const joint_physical_work_value = document.getElementsByName('joint_physical_work');

            // Hands For Human Physical Work or Hand Gestures
            const human_physical_work_value = document.getElementsByName('human_physical_work');

            function human_physical_work_function(check_value) {
                for (i = 0; i < human_physical_work_value.length; i++) {
                    if (human_physical_work_value[i].checked) {
                        let val = human_physical_work_value[i].value
                        if (human_physical_work_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            // Hand gestures
            const hand_gestures_value = document.getElementsByName('hand_gestures');

            function hand_gestures_function(check_value) {
                for (i = 0; i < hand_gestures_value.length; i++) {
                    if (hand_gestures_value[i].checked) {
                        let val = hand_gestures_value[i].value
                        if (hand_gestures_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            // Create Hands Human
            let human_hand_right = document.createElementNS(svgns, "polyline");
            let human_hand_left = document.createElementNS(svgns, "polyline");

            // Hands Position
            if ((human_physical_work_function("direct") || human_physical_work_function("indirect")) && hand_gestures_function("no"))
            {
                human_hand_right = document.createElementNS(svgns, "path");                
                human_hand_right.setAttribute("d", "M 168 147 C 210 135 210 100 210 80");
                human_hand_right.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                human_hand_left = document.createElementNS(svgns, "path");                
                human_hand_left.setAttribute("d", "M 131 147 C 90 135 90 100 90 80");
                human_hand_left.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
            }
            else if (human_physical_work_function("none") && hand_gestures_function("no")) {  
                human_hand_right.setAttribute("points", "168,147 220,175 184,190");
                human_hand_right.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                human_hand_left.setAttribute("points", "132,147 80,175 116,190");
                human_hand_left.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            }
            else if (human_physical_work_function("none") && hand_gestures_function("yes") && joint_physical_work_function("none")) {
                human_hand_right.setAttribute("points", "168,147 210,180 240,150");
                human_hand_right.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                human_hand_left.setAttribute("points", "132,147 90,180 60,150");
                human_hand_left.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            }
            
            
            if ((human_physical_work_function("direct") || human_physical_work_function("indirect")) && (joint_physical_work_function("direct") || joint_physical_work_function("indirect"))) {
                error_message.innerHTML = 'Human can not perform physical work individually and share physical work with the Agent at the same time. '
            }

            if (((human_physical_work_function("direct") || human_physical_work_function("indirect")) || (joint_physical_work_function("direct") || joint_physical_work_function("indirect"))) && hand_gestures_function("yes")) {
                error_message.innerHTML = 'Human can not perform physical work individually or share physical work with the Agent and using hands for teleoperation at the same time. '
            }
            svg.appendChild(human_hand_right);
            svg.appendChild(human_hand_left);

            // Rectangle For Human Physical Work 
            let human_physical_work = document.createElementNS(svgns, "rect");
            human_physical_work.setAttributeNS(null, "x", 80);
            human_physical_work.setAttributeNS(null, "y", 40);
            human_physical_work.setAttributeNS(null, "width", 140);
            human_physical_work.setAttributeNS(null, "height", 40);

            function joint_physical_work_function(check_value) {
                //console.log(check_value)
                for (i = 0; i < joint_physical_work_value.length; i++) {
                    if (joint_physical_work_value[i].checked) {
                        let val = joint_physical_work_value[i].value
                        //console.log(val)
                        if (joint_physical_work_value[i].value == check_value) {
                            //console.log(check_value)
                            return true
                        }  
                    }
                }
            }

            if (human_physical_work_function("direct") && hand_gestures_function("no") && joint_physical_work_function("none"))
            {
                human_physical_work.setAttributeNS(null, 'style', 'fill: blue; stroke: black; stroke-width: 2px;' );
                svg.appendChild(human_physical_work);
            }
            else if (human_physical_work_function("indirect") && hand_gestures_function("no") && joint_physical_work_function("none")) {
                human_physical_work.setAttributeNS(null, 'style', 'fill: lightblue; stroke: black; stroke-width: 2px;' );
                svg.appendChild(human_physical_work);
            }


            // Create Agent Body
            let agent_body = document.createElementNS(svgns, "rect");
            agent_body.setAttributeNS(null, "x", 380);
            agent_body.setAttributeNS(null, "y", 140);
            agent_body.setAttributeNS(null, "width", 100);
            agent_body.setAttributeNS(null, "height", 110);
            agent_body.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            svg.appendChild(agent_body);

            
            // Agent Cognitive Work
            const agent_cognitive_work_value = document.getElementsByName('agent_cognitive_work');

            function agent_cognitive_work_function(check_value) {
                for (i = 0; i < agent_cognitive_work_value.length; i++) {
                    if (agent_cognitive_work_value[i].checked) {
                        let val = agent_cognitive_work_value[i].value
                        if (agent_cognitive_work_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }


            let agent_cognitive_work = document.createElementNS(svgns, "rect");
            agent_cognitive_work.setAttributeNS(null, "x", 410);
            agent_cognitive_work.setAttributeNS(null, "y", 105);
            agent_cognitive_work.setAttributeNS(null, "width", 40);
            agent_cognitive_work.setAttributeNS(null, "height", 35);

            if (agent_cognitive_work_function("direct"))
            {
                agent_cognitive_work.setAttributeNS(null, 'style', 'fill: blue; stroke: black; stroke-width: 2px;' );
            }
            else if (agent_cognitive_work_function("indirect")) {
                agent_cognitive_work.setAttributeNS(null, 'style', 'fill: lightblue; stroke: black; stroke-width: 2px;' );
            }
            else if (agent_cognitive_work_function("minimal")) {
                agent_cognitive_work.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            }
            svg.appendChild(agent_cognitive_work);


            // Hands For Agent Physical Work
            const agent_physical_work_value = document.getElementsByName('agent_physical_work');

            function agent_physical_work_function(check_value) {
                for (i = 0; i < agent_physical_work_value.length; i++) {
                    if (agent_physical_work_value[i].checked) {
                        let val = agent_physical_work_value[i].value
                        if (agent_physical_work_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

             // Create Hands
            let agent_hand_right = document.createElementNS(svgns, "polyline");
            let agent_hand_left = document.createElementNS(svgns, "polyline");

            // Hands Position
            if (agent_physical_work_function("direct") || agent_physical_work_function("indirect"))
            {
                agent_hand_right.setAttribute("points", "395,160 370,160 370,80");
                agent_hand_right.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                agent_hand_left.setAttribute("points", "465,160 490,160 490,80");
                agent_hand_left.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            }
            else if (agent_physical_work_function("none")) {
                agent_hand_right.setAttribute("points", "395,160 350,190 380,210");
                agent_hand_right.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                agent_hand_left.setAttribute("points", "465,160 510,190 480,210");
                agent_hand_left.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
            }
            svg.appendChild(agent_hand_right);
            svg.appendChild(agent_hand_left);

            
            // Rectangle For Agent Physical Work 
            let agent_physical_work = document.createElementNS(svgns, "rect");
            agent_physical_work.setAttributeNS(null, "x", 360);
            agent_physical_work.setAttributeNS(null, "y", 40);
            agent_physical_work.setAttributeNS(null, "width", 140);
            agent_physical_work.setAttributeNS(null, "height", 40);

            if (agent_physical_work_function("direct") && joint_physical_work_function("none"))
            {
                agent_physical_work.setAttributeNS(null, 'style', 'fill: blue; stroke: black; stroke-width: 2px;' );
                svg.appendChild(agent_physical_work);
            }
            else if (agent_physical_work_function("indirect") && joint_physical_work_function("none")) {
                agent_physical_work.setAttributeNS(null, 'style', 'fill: lightblue; stroke: black; stroke-width: 2px;' );
                svg.appendChild(agent_physical_work);
            }


            if ((agent_physical_work_function("direct") || agent_physical_work_function("indirect")) && (joint_physical_work_function("direct") || joint_physical_work_function("indirect"))) {
                error_message.innerHTML += '<br> Agent can not perform physical work individually and share physical work with the Human at the same time.'
            }


            // Joint Physical Work
            let joint_physical_work = document.createElementNS(svgns, "rect");
            joint_physical_work.setAttributeNS(null, "x", 80);
            joint_physical_work.setAttributeNS(null, "y", 40);
            joint_physical_work.setAttributeNS(null, "width", 420);
            joint_physical_work.setAttributeNS(null, "height", 40);

            if ((joint_physical_work_function("direct") || joint_physical_work_function("indirect")) && agent_physical_work_function("none") && human_physical_work_function("none") && hand_gestures_function("no"))
            {
                if (joint_physical_work_function("direct") == true) {
                    joint_physical_work.setAttributeNS(null, 'style', 'fill: blue; stroke: black; stroke-width: 2px;' );
                }
                else if (joint_physical_work_function("indirect") == true){
                    joint_physical_work.setAttributeNS(null, 'style', 'fill: lightblue; stroke: black; stroke-width: 2px;' );
                }
                svg.appendChild(joint_physical_work);

                svg.removeChild(agent_hand_right);
                svg.removeChild(agent_hand_left);
                
                // Create Hands For Agent
                let agent_joint_hand_right = document.createElementNS(svgns, "polyline");
                let agent_joint_hand_left = document.createElementNS(svgns, "polyline");
                agent_joint_hand_right.setAttribute("points", "395,160 370,160 370,80");
                agent_joint_hand_right.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                agent_joint_hand_left.setAttribute("points", "465,160 490,160 490,80");
                agent_joint_hand_left.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                svg.appendChild(agent_joint_hand_right);
                svg.appendChild(agent_joint_hand_left);

                svg.removeChild(human_hand_right);
                svg.removeChild(human_hand_left);

                // Create Hands For Human
                let human_joint_hand_right = document.createElementNS(svgns, "path");                
                human_joint_hand_right.setAttribute("d", "M 168 147 C 210 135 210 100 210 80");
                human_joint_hand_right.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                let human_joint_hand_left = document.createElementNS(svgns, "path");                
                human_joint_hand_left.setAttribute("d", "M 131 147 C 90 135 90 100 90 80");
                human_joint_hand_left.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                svg.appendChild(human_joint_hand_right);
                svg.appendChild(human_joint_hand_left);
                
            }

            // Location
            const location_value = document.getElementsByName('location');

            function location_function(check_value) {
                for (i = 0; i < location_value.length; i++) {
                    if (location_value[i].checked) {
                        let val = location_value[i].value
                        if (location_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            if (location_function("physical_proximity")) {
                let location = document.createElementNS(svgns, "rect");
                location.setAttributeNS(null, "x", 100);
                location.setAttributeNS(null, "y", 270);
                location.setAttributeNS(null, "width", 400);
                location.setAttributeNS(null, "height", 10);
                location.setAttributeNS(null, 'style', 'fill: grey;' );
                svg.appendChild(location);
            }
            else if (location_function("remote")) {
                let location_human = document.createElementNS(svgns, "rect");
                location_human.setAttributeNS(null, "x", 90);
                location_human.setAttributeNS(null, "y", 270);
                location_human.setAttributeNS(null, "width", 120);
                location_human.setAttributeNS(null, "height", 10);
                location_human.setAttributeNS(null, 'style', 'fill: grey;' );
                svg.appendChild(location_human);

                let location_agent = document.createElementNS(svgns, "rect");
                location_agent.setAttributeNS(null, "x", 370);
                location_agent.setAttributeNS(null, "y", 270);
                location_agent.setAttributeNS(null, "width", 120);
                location_agent.setAttributeNS(null, "height", 10);
                location_agent.setAttributeNS(null, 'style', 'fill: grey;' );
                svg.appendChild(location_agent);
            }

            // Supervision Levels
            const supervision_value = document.querySelector('#supervision_level').value;
            
            const supervision_starter_value = document.getElementsByName('supervision_starter');

            function supervision_starter_function(check_value) {
                for (i = 0; i < supervision_starter_value.length; i++) {
                    if (supervision_starter_value[i].checked) {
                        let val = supervision_starter_value[i].value
                        if (supervision_starter_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }


            if (supervision_value === "5") {
                if (supervision_starter_function("human")) {
                    let arrow_body = document.createElementNS(svgns, "rect");
                    arrow_body.setAttributeNS(null, "x", 235);
                    arrow_body.setAttributeNS(null, "y", 115);
                    arrow_body.setAttributeNS(null, "width", 80);
                    arrow_body.setAttributeNS(null, "height", 15);
                    arrow_body.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_body);

                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "314,105 340,123 314,140");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }
                else if (supervision_starter_function("agent")) {
                    let arrow_body = document.createElementNS(svgns, "rect");
                    arrow_body.setAttributeNS(null, "x", 260);
                    arrow_body.setAttributeNS(null, "y", 115);
                    arrow_body.setAttributeNS(null, "width", 80);
                    arrow_body.setAttributeNS(null, "height", 15);
                    arrow_body.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_body);

                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "261,105 235,123 261,140");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }
            }
            else if (supervision_value === "4") {
                if (supervision_starter_function("human")) {
                    let arrow = document.createElementNS(svgns, "polyline");
                    arrow.setAttribute("points", "235,115 245,122 235,129 315,129 330,122 315,115 235,115");
                    arrow.setAttributeNS(null, 'style', 'fill: black; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
                }
                else if (supervision_starter_function("agent")) {
                    let arrow = document.createElementNS(svgns, "polyline");
                    arrow.setAttribute("points", "330,115 320,122 330,129 250,129 235,122 250,115 330,115");
                    arrow.setAttributeNS(null, 'style', 'fill: black; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
                }
            } 
            else if (supervision_value === "3") {
                if (supervision_starter_function("human")) {
                    let arrow = document.createElementNS(svgns, "polyline");
                    arrow.setAttribute("points", "235,114 315,114 315,105 340,120 315,135 315,126 235,126 235,114");
                    arrow.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
                }
                else if (supervision_starter_function("agent")) {
                    let arrow = document.createElementNS(svgns, "polyline");
                    arrow.setAttribute("points", "340,114 260,114 260,105 235,120 260,135 260,126 340,126, 340,114");
                    arrow.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
                }
            }
            else if (supervision_value === "2") {
                if (supervision_starter_function("human")) {
                    let arrow_body = document.createElementNS(svgns, "rect");
                    arrow_body.setAttributeNS(null, "x", 235);
                    arrow_body.setAttributeNS(null, "y", 120);
                    arrow_body.setAttributeNS(null, "width", 80);
                    arrow_body.setAttributeNS(null, "height", 3);
                    arrow_body.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_body);

                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "314,115 330,121 314,128");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }
                else if (supervision_starter_function("agent")) {
                    let arrow_body = document.createElementNS(svgns, "rect");
                    arrow_body.setAttributeNS(null, "x", 250);
                    arrow_body.setAttributeNS(null, "y", 120);
                    arrow_body.setAttributeNS(null, "width", 80);
                    arrow_body.setAttributeNS(null, "height", 3);
                    arrow_body.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_body);

                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "251,115 235,121 251,128");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }
            }            

            // Handover Physical Object
            const handover_value = document.getElementsByName('handover');

            function handover_function(check_value) {
                for (i = 0; i < handover_value.length; i++) {
                    if (handover_value[i].checked) {
                        let val = handover_value[i].value
                        if (handover_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            if (handover_function("human") && (human_physical_work_function("direct") || human_physical_work_function("indirect")) && (agent_physical_work_function("direct") || agent_physical_work_function("indirect")) ) {
                
                let arrow = document.createElementNS(svgns, "path");
                arrow.setAttribute("d", "M 230 60 l110 0");
                arrow.setAttribute("stroke-dasharray", "10,10");
                arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                svg.appendChild(arrow);

                let arrow_apex = document.createElementNS(svgns, "polyline");
                arrow_apex.setAttribute("points", "340,53 348,60 340,66");
                arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                svg.appendChild(arrow_apex);
            }
            else if (handover_function("agent") && (human_physical_work_function("direct") || human_physical_work_function("indirect")) && (agent_physical_work_function("direct") || agent_physical_work_function("indirect"))) {
                
                let arrow = document.createElementNS(svgns, "path");
                arrow.setAttribute("d", "M 238 60 l110 0");
                arrow.setAttribute("stroke-dasharray", "10,10");
                arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                svg.appendChild(arrow);

                let arrow_apex = document.createElementNS(svgns, "polyline");
                arrow_apex.setAttribute("points", "238,53 230,60 238,66");
                arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                svg.appendChild(arrow_apex);
            }

            if ((handover_function("human") || handover_function("agent")) && (human_physical_work_function("none") && agent_physical_work_function("none"))) {
                error_message.innerHTML += 'Handover of a physical object requires physical work of the human and the agent.'
            }

            if ((handover_function("human") || handover_function("agent")) && (human_physical_work_function("none") && (agent_physical_work_function("direct") || agent_physical_work_function("indirect")))) {
                error_message.innerHTML += 'Handover of a physical object requires physical work of the human and the agent.'
            }

            if ((handover_function("human") || handover_function("agent")) && (agent_physical_work_function("none") && (human_physical_work_function("direct") || human_physical_work_function("indirect")))) {
                error_message.innerHTML += 'Handover of a physical object requires physical work of the human and the agent.'
            }
            
            // jQuery for modalities           
            let modalities = $('.communication_modalities:checked').map(function () {
                return this.value;
                }).get();
            //console.log(modalities);
            
            for (let i = 0; i < modalities.length; i++) {
                //console.log(modalities[i])

                // Visual modality
                if(modalities[i] === "visual") {
                    let eye_inside = document.createElementNS(svgns, "circle");
                    eye_inside.setAttributeNS(null, "cx", 280);
                    eye_inside.setAttributeNS(null, "cy", 315);
                    eye_inside.setAttributeNS(null, "r",  5);
                    svg.appendChild(eye_inside)

                    let eye_middle = document.createElementNS(svgns, "circle");
                    eye_middle.setAttributeNS(null, "cx", 280);
                    eye_middle.setAttributeNS(null, "cy", 315);
                    eye_middle.setAttributeNS(null, "r",  10);
                    eye_middle.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 2px;' );
                    svg.appendChild(eye_middle)

                    let eye_outside_upper = document.createElementNS(svgns, "path");
                    eye_outside_upper.setAttribute("d", "M 255 315 q 25 -20 50 0");
                    eye_outside_upper.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(eye_outside_upper);

                    let eye_outside_lower = document.createElementNS(svgns, "path");
                    eye_outside_lower.setAttribute("d", "M 255 315 q 25 20 50 0");
                    eye_outside_lower.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(eye_outside_lower);
                }

                // Haptic modality
                else if (modalities[i] === "haptic") {
                    let hand_left_1 = document.createElementNS(svgns, "polyline");
                    hand_left_1.setAttribute("points", "205,310 205,328 207,330 207,343");
                    hand_left_1.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 1px;' );
                    svg.appendChild(hand_left_1);

                    let hand_left_2 = document.createElementNS(svgns, "line");
                    hand_left_2.setAttributeNS(null, "x1", 210);
                    hand_left_2.setAttributeNS(null, "y1", 320);
                    hand_left_2.setAttributeNS(null, "x2", 210);
                    hand_left_2.setAttributeNS(null, "y2", 310);
                    hand_left_2.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_2);

                    let hand_left_2_path = document.createElementNS(svgns, "path");
                    hand_left_2_path.setAttribute("d", "M 205 310 q 3 -7 5 0");
                    hand_left_2_path.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_2_path);

                    let hand_left_3 = document.createElementNS(svgns, "line");
                    hand_left_3.setAttributeNS(null, "x1", 210);
                    hand_left_3.setAttributeNS(null, "y1", 320);
                    hand_left_3.setAttributeNS(null, "x2", 210);
                    hand_left_3.setAttributeNS(null, "y2", 305);
                    hand_left_3.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_3);

                    let hand_left_4 = document.createElementNS(svgns, "line");
                    hand_left_4.setAttributeNS(null, "x1", 215);
                    hand_left_4.setAttributeNS(null, "y1", 320);
                    hand_left_4.setAttributeNS(null, "x2", 215);
                    hand_left_4.setAttributeNS(null, "y2", 305);
                    hand_left_4.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_4);

                    let hand_left_4_path = document.createElementNS(svgns, "path");
                    hand_left_4_path.setAttribute("d", "M 210 305 q 3 -7 5 0");
                    hand_left_4_path.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_4_path);

                    let hand_left_5 = document.createElementNS(svgns, "line");
                    hand_left_5.setAttributeNS(null, "x1", 215);
                    hand_left_5.setAttributeNS(null, "y1", 320);
                    hand_left_5.setAttributeNS(null, "x2", 215);
                    hand_left_5.setAttributeNS(null, "y2", 300);
                    hand_left_5.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_5);

                    let hand_left_6 = document.createElementNS(svgns, "line");
                    hand_left_6.setAttributeNS(null, "x1", 220);
                    hand_left_6.setAttributeNS(null, "y1", 320);
                    hand_left_6.setAttributeNS(null, "x2", 220);
                    hand_left_6.setAttributeNS(null, "y2", 300);
                    hand_left_6.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_6);

                    let hand_left_6_path = document.createElementNS(svgns, "path");
                    hand_left_6_path.setAttribute("d", "M 215 300 q 3 -7 5 0");
                    hand_left_6_path.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_6_path);

                    let hand_left_7 = document.createElementNS(svgns, "line");
                    hand_left_7.setAttributeNS(null, "x1", 220);
                    hand_left_7.setAttributeNS(null, "y1", 320);
                    hand_left_7.setAttributeNS(null, "x2", 220);
                    hand_left_7.setAttributeNS(null, "y2", 305);
                    hand_left_7.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_7);

                    let hand_left_8 = document.createElementNS(svgns, "line");
                    hand_left_8.setAttributeNS(null, "x1", 225);
                    hand_left_8.setAttributeNS(null, "y1", 325);
                    hand_left_8.setAttributeNS(null, "x2", 225);
                    hand_left_8.setAttributeNS(null, "y2", 305);
                    hand_left_8.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_8);

                    let hand_left_8_path = document.createElementNS(svgns, "path");
                    hand_left_8_path.setAttribute("d", "M 220 305 q 3 -7 5 0");
                    hand_left_8_path.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_8_path);

                    let hand_left_9 = document.createElementNS(svgns, "line");
                    hand_left_9.setAttributeNS(null, "x1", 225);
                    hand_left_9.setAttributeNS(null, "y1", 325);
                    hand_left_9.setAttributeNS(null, "x2", 228);
                    hand_left_9.setAttributeNS(null, "y2", 315);
                    hand_left_9.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_9);
                   
                    let hand_left_9_path = document.createElementNS(svgns, "path");
                    hand_left_9_path.setAttribute("d", "M 228 315 q 5 -7 4 3");
                    hand_left_9_path.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(hand_left_9_path);

                    let hand_left_11 = document.createElementNS(svgns, "polyline");
                    hand_left_11.setAttribute("points", "232,317 228,332 220,338 220,343");
                    hand_left_11.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 1px;' );
                    svg.appendChild(hand_left_11);
                }

                // Audial modality
                else if (modalities[i] === "audial") {
                    let path_1 = document.createElementNS(svgns, "path");
                    path_1.setAttribute("d", "M 330 315 q 10 -15 20 0");
                    path_1.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(path_1);

                    let path_1_line = document.createElementNS(svgns, "line");
                    path_1_line.setAttributeNS(null, "x1", 330);
                    path_1_line.setAttributeNS(null, "y1", 315);
                    path_1_line.setAttributeNS(null, "x2", 335);
                    path_1_line.setAttributeNS(null, "y2", 321);
                    path_1_line.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                    svg.appendChild(path_1_line);

                    let path_1a = document.createElementNS(svgns, "polyline");
                    path_1a.setAttribute("points", "350,315 350,320 342,325");
                    path_1a.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 1px;' );
                    svg.appendChild(path_1a);
                   
                    let path_2 = document.createElementNS(svgns, "path");
                    path_2.setAttribute("d", "M 330 325 q 5 15 12 0");
                    path_2.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(path_2);
                    
                    let path_3 = document.createElementNS(svgns, "path");
                    path_3.setAttribute("d", "M 330 315 q 10 -26 26 0");
                    path_3.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(path_3);

                    let path_4 = document.createElementNS(svgns, "path");
                    path_4.setAttribute("d", "M 323 315 q 20 -36 38 0");
                    path_4.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(path_4);

                    let path_4a = document.createElementNS(svgns, "polyline");
                    path_4a.setAttribute("points", "361,315 357,320 352,325");
                    path_4a.setAttributeNS(null, 'style', 'fill: none; stroke: black; stroke-width: 1px;' );
                    svg.appendChild(path_4a);

                    let path_5 = document.createElementNS(svgns, "path");
                    path_5.setAttribute("d", "M 330 335 q 18 10 22 -10");
                    path_5.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 1px;');
                    svg.appendChild(path_5);
                }
            }

            const teacher_value = document.getElementsByName('teacher');

            function teacher_function(check_value) {
                for (i = 0; i < teacher_value.length; i++) {
                    if (teacher_value[i].checked) {
                        let val = teacher_value[i].value
                        if (teacher_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            // Human teaches
            if (teacher_function("human") || teacher_function("agent")) {

                // Create Academic Hut
                let hut_up = document.createElementNS(svgns, "polyline");
                hut_up.setAttribute("points", "267,150 282,145 297,150 282,155 267,150");
                hut_up.setAttributeNS(null, 'style', 'fill: black;' );
                svg.appendChild(hut_up);
                
                let hut_down = document.createElementNS(svgns, "polyline");
                hut_down.setAttribute("points", "274,153 282,156 291,153 291,161 282,163 272,161 272,152");
                hut_down.setAttributeNS(null, 'style', 'fill: black;' );
                svg.appendChild(hut_down);

                let hut_line = document.createElementNS(svgns, "line");
                hut_line.setAttributeNS(null, "x1", 268);
                hut_line.setAttributeNS(null, "y1", 150);
                hut_line.setAttributeNS(null, "x2", 268);
                hut_line.setAttributeNS(null, "y2", 155);
                hut_line.setAttributeNS(null, 'style', 'stroke: black; stroke-width: 1px;');
                svg.appendChild(hut_line);

                let hut_circle = document.createElementNS(svgns, "circle");
                hut_circle.setAttributeNS(null, "cx", 268);
                hut_circle.setAttributeNS(null, "cy", 156);
                hut_circle.setAttributeNS(null, "r",  1);
                svg.appendChild(hut_circle);

                let hut_triangle = document.createElementNS(svgns, "polyline");
                hut_triangle.setAttribute("points", "268,155 270,162 266,162 268,155 ");
                hut_triangle.setAttributeNS(null, 'style', 'fill: black;' );
                svg.appendChild(hut_triangle);

                // Determine arrow direction
                if (teacher_function("human")) {
                    let arrow = document.createElementNS(svgns, "path");
                    arrow.setAttribute("d", "M 235 170 l85 0");
                    arrow.setAttribute("stroke-dasharray", "10,10");
                    arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
    
                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "320,165 330,170 320,175");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }
                else if (teacher_function("agent")) {
                    let arrow = document.createElementNS(svgns, "path");
                    arrow.setAttribute("d", "M 245 170 l85 0");
                    arrow.setAttribute("stroke-dasharray", "10,10");
                    arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
    
                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "235,170 245,165 245,175");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);    
                }

            }

            const question_value = document.getElementsByName('question');

            function question_function(check_value) {
                for (i = 0; i < question_value.length; i++) {
                    if (question_value[i].checked) {
                        let val = question_value[i].value
                        if (question_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            if (question_function("human") || question_function("agent")) {

                let question_mark = document.createElementNS(svgns, "text");
                question_mark.textContent = "?";
                question_mark.setAttributeNS(null, 'x', 277);
                question_mark.setAttributeNS(null, 'y', 198);
                question_mark.setAttributeNS(null, 'style', 'stroke: black; ');
                svg.appendChild(question_mark);

                if (question_function("human") == true) {
                    let arrow = document.createElementNS(svgns, "path");
                    arrow.setAttribute("d", "M 235 205 l85 0");
                    arrow.setAttribute("stroke-dasharray", "10,10");
                    arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
    
                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "320,200 330,205 320,210");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }
                else if (question_function("agent") == true) {
                    let arrow = document.createElementNS(svgns, "path");
                    arrow.setAttribute("d", "M 245 205 l85 0");
                    arrow.setAttribute("stroke-dasharray", "10,10");
                    arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
    
                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "235,205 245,200 245,210");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);  
                }
            }

            const feedback_value = document.getElementsByName('feedback');

            function feedback_function(check_value) {
                for (i = 0; i < feedback_value.length; i++) {
                    if (feedback_value[i].checked) {
                        let val = feedback_value[i].value
                        if (feedback_value[i].value == check_value) {
                            return true
                        } 
                    }
                }
            }

            if (feedback_function("human") || feedback_function("agent")) {

                let f = document.createElementNS(svgns, "text");
                f.textContent = "F";
                f.setAttributeNS(null, 'x', 277);
                f.setAttributeNS(null, 'y', 233);
                f.setAttributeNS(null, 'style', 'stroke: black; ');
                svg.appendChild(f);


                if (feedback_function("human") == true) {
                    let arrow = document.createElementNS(svgns, "path");
                    arrow.setAttribute("d", "M 235 240 l85 0");
                    arrow.setAttribute("stroke-dasharray", "10,10");
                    arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
    
                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "320,235 330,240 320,245");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex);
                }

                else if (feedback_function("agent") == true){
                    let arrow = document.createElementNS(svgns, "path");
                    arrow.setAttribute("d", "M 245 240 l85 0");
                    arrow.setAttribute("stroke-dasharray", "10,10");
                    arrow.setAttributeNS(null, 'style', 'fill:transparent; stroke: black; stroke-width: 2px;');
                    svg.appendChild(arrow);
    
                    let arrow_apex = document.createElementNS(svgns, "polyline");
                    arrow_apex.setAttribute("points", "235,240 245,235 245,245");
                    arrow_apex.setAttributeNS(null, 'style', 'fill: black;' );
                    svg.appendChild(arrow_apex); 
                }
            }

            // Show Select Dimensions Button
            document.querySelector('#select_dimensions').style.display = 'block';
            // Hide Filter Div
            document.querySelector('#filter_div').style.display = 'none'; 
        });
    }
})