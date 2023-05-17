class Member {
    constructor(name, days, hours, u35_goal, ue35_goal, wb_goal, tv_goal, vvl_goal, fn_goal, u35_reached, ue35_reached, wb_reached, tv_reached, vvl_reached, fn_reached) {
        this.name = name;
        this.days = days;
        this.hours = hours;
        this.u35_goal = u35_goal;
        this.ue35_goal = ue35_goal;
        this.wb_goal = wb_goal;
        this.tv_goal = tv_goal;
        this.vvl_goal = vvl_goal;
        this.fn_goal = fn_goal;
        this.u35_reached = u35_reached;
        this.ue35_reached = ue35_reached;
        this.wb_reached = wb_reached;
        this.tv_reached = tv_reached;
        this.vvl_reached = vvl_reached;
        this.fn_reached = fn_reached;
    }
}


// generate the html for each member
function generateEmployeeForm(employees) {
    let html = '';
  
    employees.forEach(function(employee) {
      html += `<div>
                  <h3 class="name-label" for="${employee}">${employee}</h3>
                  <div id="${employee}-textboxes" class="textboxes-group">
                      <div>
                          <label for="${employee}_days">Tage:</label>
                          <br>
                          <input type="number" id="${employee}_days" name="${employee}_days" step="0.1" required>
                      </div>
                      <div>
                          <label for="${employee}_hours">Stunden pro Tag:</label>
                          <br>
                          <input type="number" id="${employee}_hours" name="${employee}_hours" step="0.1" required>
                      </div>
                      <div>
                          <label for="${employee}_u35">U35:</label>
                          <br>
                          <input type="number" id="${employee}_u35" name="${employee}_u35">
                      </div>
                      <div>
                          <label for="${employee}_ue35">Ü35:</label>
                          <br>
                          <input type="number" id="${employee}_ue35" name="${employee}_ue35">
                      </div>
                      <div>
                          <label for="${employee}_wb">WB:</label>
                          <br>
                          <input type="number" id="${employee}_wb" name="${employee}_wb">
                      </div>
                      <div>
                          <label for="${employee}_tv">TV:</label>
                          <br>
                          <input type="number" id="${employee}_tv" name="${employee}_tv">
                      </div>
                      <div>
                          <label for="${employee}_vvl">VVL:</label>
                          <br>
                          <input type="number" id="${employee}_vvl" name="${employee}_vvl">
                      </div>
                      <div>
                          <label for="${employee}_fn">FN:</label>
                          <br>
                          <input type="number" id="${employee}_fn" name="${employee}_fn">
                      </div>
                  </div>
              </div>`;
    });  
    return html;
}

// goal for each member based on days
function calculatePersonalGoal(number, hours, allHours) {
    var percentage = hours / allHours;
    return number * percentage;
}

// used to round personal goals since they have to be an integer
function convertDoublesToIntegers(arrayOfDoubles, goal) {
    const numWorkers = arrayOfDoubles.length;
    const integerArray = arrayOfDoubles.map(x => Math.floor(x));
    const decimalArray = arrayOfDoubles.map(x => x - Math.floor(x));
    let sum = integerArray.reduce((a, b) => a + b, 0);
    let remaining = goal - sum;
  
    if (remaining === 0) {
      return integerArray;
    }
  
    const sortedIndexes = decimalArray.map((x, i) => i).sort((a, b) => decimalArray[b] - decimalArray[a]);
    let index = 0;
  
    while (remaining > 0) {
      const i = sortedIndexes[index];
      integerArray[i]++;
      remaining--;
      index = (index + 1) % numWorkers;
    }
  
    return integerArray;
}

function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
}

function totalColumn(arr)
{
  total = 0;
  for (i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

function strikeThrough(text) {
    return text
      .split('')
      .map(char => char + '\u0336')
      .join('')
  }

var memberInput = document.getElementById('member-name');
var memberList = document.getElementById('member-list');
var addMemberButton = document.getElementById('add-member');
var memberAttributes = document.getElementById('member-attributes');
var submitButton = document.getElementById('submit-member-attributes');
var memberListLabel = document.getElementById('member-attributes-label');
var memberNames = [];


// adds user input to memberContainer
addMemberButton.addEventListener('click', function() {
    var paragraph = document.createElement('p');
    paragraph.innerText = memberInput.value;
    memberList.appendChild(paragraph);
    memberNames.push(memberInput.value);
    memberListLabel.removeAttribute("hidden");
    memberInput.value="";
    
    // remove member if clicked
    paragraph.addEventListener('click', function() {
        var index = memberNames.indexOf(paragraph.innerText);
        if (index !== -1) {
            memberNames.splice(index, 1);
        }

        memberList.removeChild(paragraph);

        // set label to hidden if there are no members
        if (memberNames.length == 0) {
            memberListLabel.setAttribute("hidden", "hidden");
        }

        memberAttributes.innerHTML = generateEmployeeForm(memberNames); // update if members removed
    });
    memberAttributes.innerHTML = generateEmployeeForm(memberNames); // update if member added

    // cross member if mouse hovers over it
    paragraph.addEventListener('mouseover', function() {
        paragraph.style.textDecoration = "line-through";
    });

    // remove the line-through once the user doesnt hover over it anymore
    paragraph.addEventListener('mouseout', function() {
        paragraph.style.textDecoration = "none";
    });
});

submitButton.addEventListener('click', function() {
    // add all variables
    u35_total_goal = Number(document.getElementById('u35-goal').value);
    ue35_total_goal = Number(document.getElementById('ue35-goal').value);
    wb_total_goal = Number(document.getElementById('wb-goal').value);
    tv_total_goal = Number(document.getElementById('tv-goal').value);
    vvl_total_goal = Number(document.getElementById('vvl-goal').value);
    fn_total_goal = Number(document.getElementById('fn-goal').value);

    // calculate member's total days since we need it to calculate the personal goal
    totalDays = 0;
    memberNames.forEach(function(member) {
        var daysInput = document.getElementById(member + '_days');
        var days = Number(daysInput.value);
        totalDays += days;
    });
    
    // getting goal variables from user input
    u35_total_goal = Number(document.getElementById('u35-goal').value);
    ue35_total_goal = Number(document.getElementById('ue35-goal').value);
    wb_total_goal = Number(document.getElementById('wb-goal').value);
    tv_total_goal = Number(document.getElementById('tv-goal').value);
    vvl_total_goal = Number(document.getElementById('vvl-goal').value);
    fn_total_goal = Number(document.getElementById('fn-goal').value);
    
    // calculate member's total days and hours since we need it to calculate the personal goal
    totalDays = 0;
    totalHours = 0;
    memberNames.forEach(function(member) {
        var daysInput = document.getElementById(member + '_days');
        var days = Number(daysInput.value);

        var hoursInput = document.getElementById(member + '_hours');
        var hours = Number(hoursInput.value) * days;

        totalHours += hours;
        totalDays += days;
    });
        
    // generate all members
    var members = [];
    memberNames.forEach(function(member) {
        var daysInput = document.getElementById(member + '_days');
        var days = Number(daysInput.value);

        var hoursInput = document.getElementById(member + '_hours');
        var hours = Number(hoursInput.value) * days;

        var u35_goal = calculatePersonalGoal(u35_total_goal, hours, totalHours);
        var ue35_goal = calculatePersonalGoal(ue35_total_goal, hours, totalHours);
        var wb_goal = calculatePersonalGoal(wb_total_goal, hours, totalHours);
        var tv_goal = calculatePersonalGoal(tv_total_goal, hours, totalHours);
        var vvl_goal = calculatePersonalGoal(vvl_total_goal, hours, totalHours);
        var fn_goal = calculatePersonalGoal(fn_total_goal, hours, totalHours);
        var u35_reached = Number(document.getElementById(member + '_u35').value);
        var ue35_reached = Number(document.getElementById(member + '_ue35').value);
        var wb_reached = Number(document.getElementById(member + '_wb').value);
        var tv_reached = Number(document.getElementById(member + '_tv').value);
        var vvl_reached = Number(document.getElementById(member + '_vvl').value);
        var fn_reached = Number(document.getElementById(member + '_fn').value);
        var memberObj = new Member(member, days, Number(hoursInput.value), u35_goal, ue35_goal, wb_goal, tv_goal, vvl_goal, fn_goal, u35_reached, ue35_reached, wb_reached, tv_reached, vvl_reached, fn_reached);
        members.push(memberObj);
    });

    // generate basic table (no rounding)
    // create table header
    const basicTableHeader = `
        <tr>
            <th>Name</th>
            <th>Tage</th>
            <th>Stunden</th>
            <th>U35</th>
            <th>Ü35</th>
            <th>WB</th>
            <th>TV</th>
            <th>VVL</th>
            <th>FN</th>
        </tr>
    `;

    // create table rows
    let basicTableRows = '';
    for (const member of members) {
        const row = `
            <tr>
                <td>${member.name}</td>
                <td>${member.days}</td>
                <td>${member.hours}</td>
                <td>${roundToTwoDecimals(member.u35_goal)}</td>
                <td>${roundToTwoDecimals(member.ue35_goal)}</td>
                <td>${roundToTwoDecimals(member.wb_goal)}</td>
                <td>${roundToTwoDecimals(member.tv_goal)}</td>
                <td>${roundToTwoDecimals(member.vvl_goal)}</td>
                <td>${roundToTwoDecimals(member.fn_goal)}</td>
            </tr>
        `;
    basicTableRows += row; 
    }

    // replace clean tables in index.html since its easier than generating ones (without duplicates, ...)
    const basicTableLable = document.getElementById('basic-table-lable');
    const basicTable = document.getElementById('basic-table');
    basicTableLable.innerHTML = "Tabelle ohne Rundungen";
    basicTable.innerHTML = basicTableHeader + basicTableRows;

    // generate basic table with rounding
    // store personal goals in an array in order to convert them to integers
    // not my prettiest code yet, may improve in future
    array_u35_goal = [];
    array_ue35_goal = [];
    array_wb_goal = [];
    array_tv_goal = [];
    array_vvl_goal = [];
    array_fn_goal = [];

    i = 0;
    for (const member of members) {
        array_u35_goal[i] = member.u35_goal;
        array_ue35_goal[i] = member.ue35_goal;
        array_wb_goal[i] = member.wb_goal;
        array_tv_goal[i] = member.tv_goal;
        array_vvl_goal[i] = member.vvl_goal;
        array_fn_goal[i] = member.fn_goal;
        i++;
    }

    array_u35_goal_rounded = convertDoublesToIntegers(array_u35_goal, u35_total_goal);
    array_ue35_goal_rounded = convertDoublesToIntegers(array_ue35_goal, ue35_total_goal);
    array_wb_goal_rounded = convertDoublesToIntegers(array_wb_goal, wb_total_goal);
    array_tv_goal_rounded = convertDoublesToIntegers(array_tv_goal, tv_total_goal);
    array_vvl_goal_rounded = convertDoublesToIntegers(array_vvl_goal, vvl_total_goal);
    array_fn_goal_rounded = convertDoublesToIntegers(array_fn_goal, fn_total_goal);

    // changing their attribute to their rounded form since we won't need the fractual number anyway
    i=0;
    for (member of members) {
        member.u35_goal = array_u35_goal_rounded[i];
        member.ue35_goal = array_ue35_goal_rounded[i];
        member.wb_goal = array_wb_goal_rounded[i];
        member.tv_goal = array_tv_goal_rounded[i];
        member.vvl_goal = array_vvl_goal_rounded[i];
        member.fn_goal = array_fn_goal_rounded[i];
        i++;
    }

    // only need to define rows since header doesnt change
    let basicTableRoundedRows = '';
    for (const member of members) {
        const row = `
            <tr>
                <td>${member.name}</td>
                <td>${member.days}</td>
                <td>${member.hours}</td>
                <td>${member.u35_goal}</td>
                <td>${member.ue35_goal}</td>
                <td>${member.wb_goal}</td>
                <td>${member.tv_goal}</td>
                <td>${member.vvl_goal}</td>
                <td>${member.fn_goal}</td>
            </tr>
        `;
    basicTableRoundedRows += row; 
    }

    const basicTableRoundedLable = document.getElementById('basic-table-rounded-lable');
    const basicTableRounded = document.getElementById('basic-table-rounded');
    basicTableRoundedLable.innerHTML = "Tabelle mit Rundungen";
    basicTableRounded.innerHTML = basicTableHeader + basicTableRoundedRows;

    // final table
    const tableFinalHeader = `<tr>
        <th></th>
        <th>Tage</th>
        <th>Stunden</th>
        <th>Ziel Ü35</th>
        <th>Ziel U35</th>
        <th>Ü35</th>
        <th>U35</th>
        <th>Ziel FN</th>
        <th>FN</th>
        <th>Ziel TV</th>
        <th>TV</th>
        <th>Ziel VVL</th>
        <th>VVL</th>
        <th>Ziel WB/Upsell</th>
        <th>WB/Upsell</th>
        </tr>`;

    total_ue35_reached = 0;
    total_u35_reached = 0;
    total_fn_reached = 0;
    total_tv_reached = 0;
    total_vvl_reached = 0;
    total_wb_reached = 0;
    let tableRowsFinal = '';

    // create table rows
    for (const member of members) {
        const row = `<tr>
            <td>${member.name}</td>
            <td>${member.days}</td>
            <td>${member.hours}</td>
            <td>${member.ue35_goal}</td>
            <td>${member.u35_goal}</td>
            <td>${member.ue35_reached}</td>
            <td>${member.u35_reached}</td>
            <td>${member.fn_goal}</td>
            <td>${member.fn_reached}</td>
            <td>${member.tv_goal}</td>
            <td>${member.tv_reached}</td>
            <td>${member.vvl_goal}</td>
            <td>${member.vvl_reached}</td>
            <td>${member.wb_goal}</td>
            <td>${member.wb_reached}</td>
        </tr>`;

        total_ue35_reached += member.ue35_reached;
        total_u35_reached += member.u35_reached;
        total_fn_reached += member.fn_reached;
        total_tv_reached += member.tv_reached;
        total_vvl_reached += member.vvl_reached;
        total_wb_reached += member.wb_reached;

        tableRowsFinal += row;
    }

    // shop (reached)
    tableRowsFinal += `<tr>
        <td>${"Shop (erreicht)"}</td>
        <td>${totalDays}</td>
        <td>${totalHours}</td>
        <td>${totalColumn(array_ue35_goal_rounded)}</td>
        <td>${totalColumn(array_u35_goal_rounded)}</td>
        <td>${total_ue35_reached}</td>
        <td>${total_u35_reached}</td>
        <td>${totalColumn(array_fn_goal_rounded)}</td>
        <td>${total_fn_reached}</td>
        <td>${totalColumn(array_tv_goal_rounded)}</td>
        <td>${total_tv_reached}</td>
        <td>${totalColumn(array_vvl_goal_rounded)}</td>
        <td>${total_vvl_reached}</td>
        <td>${totalColumn(array_wb_goal_rounded)}</td>
        <td>${total_wb_reached}</td>
    </tr>`;

    // difference
    tableRowsFinal += `<tr>
        <td>${"Differenz"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${-(ue35_total_goal - total_ue35_reached)}</td>
        <td>${-(u35_total_goal - total_u35_reached)}</td>
        <td>${"/"}</td>
        <td>${-(fn_total_goal - total_fn_reached)}</td>
        <td>${"/"}</td>
        <td>${-(tv_total_goal - total_tv_reached)}</td>
        <td>${"/"}</td>
        <td>${-(vvl_total_goal - total_vvl_reached)}</td>
        <td>${"/"}</td>
        <td>${-(wb_total_goal - total_wb_reached)}</td>
    </tr>`;

    // reached
    tableRowsFinal += `<tr>
        <td>${"erreicht"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${Math.round(total_ue35_reached / ue35_total_goal * 100) +"%"}</td>
        <td>${Math.round(total_u35_reached / u35_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(total_fn_reached / fn_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(total_tv_reached / tv_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(total_vvl_reached / vvl_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(total_wb_reached / wb_total_goal * 100) +"%"}</td>
    </tr>`;

    // increase/loss
    tableRowsFinal += `<tr>
        <td>${"Steigerung/Verlust"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${"/"}</td>
        <td>${Math.round(-(ue35_total_goal - total_ue35_reached) / ue35_total_goal * 100) +"%"}</td>
        <td>${Math.round(-(u35_total_goal - total_u35_reached) / u35_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(-(fn_total_goal - total_fn_reached) / fn_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(-(tv_total_goal - total_tv_reached) / tv_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(-(vvl_total_goal - total_vvl_reached) / vvl_total_goal * 100) +"%"}</td>
        <td>${"/"}</td>
        <td>${Math.round(-(wb_total_goal - total_wb_reached) / wb_total_goal * 100) +"%"}</td>
    </tr>`;

    // Set table header and rows
    const employeesTableFinal = document.getElementById('final-table');
    const employeesTableTitleFinal = document.getElementById('final-table-lable');
    employeesTableTitleFinal.innerHTML = "Komplette Tabelle";
    employeesTableFinal.innerHTML = tableFinalHeader + tableRowsFinal;

    var printButton = document.getElementById('export-btn');
    printButton.removeAttribute("hidden");
});
