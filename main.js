class Employee
{
    constructor(name, days, u35, ue35, wb, tv, vvl, fn, u35_reached, ue35_reached, wb_reached, tv_reached, vvl_reached, fn_reached)
    {
        this.name = name;
        this.days = days;
        this.u35 = u35;
        this.ue35 = ue35;
        this.wb = wb;
        this.tv = tv;
        this.vvl = vvl;
        this.fn = fn;
        this.u35_reached = u35_reached;
        this.ue35_reached = ue35_reached;
        this.wb_reached = wb_reached;
        this.tv_reached = tv_reached;
        this.vvl_reached = vvl_reached;
        this.fn_reached = fn_reached;
    }
}

const form = document.querySelector('form');


const nameLabels = document.querySelectorAll('.name-label');

nameLabels.forEach((label) => {
  const textboxesGroup = document.querySelector(`#${label.getAttribute('for')}-textboxes`);
  label.addEventListener('click', () => {
    textboxesGroup.style.display = (textboxesGroup.style.display === 'none') ? 'block' : 'none';
  });
});

const textboxesGroups = document.querySelectorAll('.textboxes-group');
textboxesGroups.forEach((group) => {
  group.style.display = 'none';
});


function calcPersonalGoal(goal, days, allDays)
{
    percentage = days / allDays;
    return Math.round(goal * percentage * 100) / 100;
}

function getFloatingNumbers(number)
{
  return number - Math.trunc(number);
}


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

function totalColumn(arr)
{
  total = 0;
  for (i = 0; i < arr.length; i++)
  {
    total += arr[i];
  }
  return total;
}

form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevents form from submitting and refreshing page
  
  // Get input values from form
  const u35 = Number(document.getElementById('u35').value);
  const ue35 = Number(document.getElementById('ue35').value);
  const wb = Number(document.getElementById('wb').value);
  const tv = Number(document.getElementById('tv').value);
  const vvl = Number(document.getElementById('vvl').value);
  const fn = Number(document.getElementById('fn').value);

  const sophieDays = Number(document.getElementById('sophieDays').value);
  const daniDays = Number(document.getElementById('daniDays').value);
  const benniDays = Number(document.getElementById('benniDays').value);
  const thomasDays = Number(document.getElementById('thomasDays').value);
  const niklasDays = Number(document.getElementById('niklasDays').value);
  const ericDays = Number(document.getElementById('ericDays').value);
  const allDays = sophieDays + daniDays + benniDays + thomasDays + niklasDays + ericDays;

  const sophie_u35 = Number(document.getElementById('sophie_u35').value);
  const dani_u35 = Number(document.getElementById('dani_u35').value);
  const benni_u35 = Number(document.getElementById('benni_u35').value);
  const thomas_u35 = Number(document.getElementById('thomas_u35').value);
  const niklas_u35 = Number(document.getElementById('niklas_u35').value);
  const eric_u35 = Number(document.getElementById('eric_u35').value);

  const sophie_ue35 = Number(document.getElementById('sophie_ue35').value);
  const dani_ue35 = Number(document.getElementById('dani_ue35').value);
  const benni_ue35 = Number(document.getElementById('benni_ue35').value);
  const thomas_ue35 = Number(document.getElementById('thomas_ue35').value);
  const niklas_ue35 = Number(document.getElementById('niklas_ue35').value);
  const eric_ue35 = Number(document.getElementById('eric_ue35').value);

  const sophie_wb = Number(document.getElementById('sophie_wb').value);
  const dani_wb = Number(document.getElementById('dani_wb').value);
  const benni_wb = Number(document.getElementById('benni_wb').value);
  const thomas_wb = Number(document.getElementById('thomas_wb').value);
  const niklas_wb = Number(document.getElementById('eric_wb').value);
  const eric_wb = Number(document.getElementById('eric_wb').value);

  const sophie_tv = Number(document.getElementById('sophie_tv').value);
  const dani_tv = Number(document.getElementById('dani_tv').value);
  const benni_tv = Number(document.getElementById('benni_tv').value);
  const thomas_tv = Number(document.getElementById('thomas_tv').value);
  const niklas_tv = Number(document.getElementById('niklas_tv').value);
  const eric_tv = Number(document.getElementById('eric_tv').value);

  const sophie_vvl = Number(document.getElementById('sophie_vvl').value);
  const dani_vvl = Number(document.getElementById('dani_vvl').value);
  const benni_vvl = Number(document.getElementById('benni_vvl').value);
  const thomas_vvl = Number(document.getElementById('thomas_vvl').value);
  const niklas_vvl = Number(document.getElementById('niklas_vvl').value);
  const eric_vvl = Number(document.getElementById('eric_vvl').value);

  const sophie_fn = Number(document.getElementById('sophie_fn').value);
  const dani_fn = Number(document.getElementById('dani_fn').value);
  const benni_fn = Number(document.getElementById('benni_fn').value);
  const thomas_fn = Number(document.getElementById('thomas_fn').value);
  const niklas_fn = Number(document.getElementById('niklas_fn').value);
  const eric_fn = Number(document.getElementById('eric_fn').value);

  const employees = [  new Employee('Sophie', sophieDays, calcPersonalGoal(u35, sophieDays, allDays), calcPersonalGoal(ue35, sophieDays, allDays), calcPersonalGoal(wb, sophieDays, allDays), calcPersonalGoal(tv, sophieDays, allDays), calcPersonalGoal(vvl, sophieDays, allDays), calcPersonalGoal(fn, sophieDays, allDays), sophie_u35, sophie_ue35, sophie_wb, sophie_tv, sophie_vvl, sophie_fn),  
  new Employee('Dani', daniDays, calcPersonalGoal(u35, daniDays, allDays), calcPersonalGoal(ue35, daniDays, allDays), calcPersonalGoal(wb, daniDays, allDays), calcPersonalGoal(tv, daniDays, allDays), calcPersonalGoal(vvl, daniDays, allDays), calcPersonalGoal(fn, daniDays, allDays), dani_u35, dani_ue35, dani_wb, dani_tv, dani_vvl, dani_fn),
  new Employee('Benni', benniDays, calcPersonalGoal(u35, benniDays, allDays), calcPersonalGoal(ue35, benniDays, allDays), calcPersonalGoal(wb, benniDays, allDays), calcPersonalGoal(tv, benniDays, allDays), calcPersonalGoal(vvl, benniDays, allDays), calcPersonalGoal(fn, benniDays, allDays), benni_u35, benni_ue35, benni_wb, benni_tv, benni_vvl, benni_fn), 
  new Employee('Thomas', thomasDays, calcPersonalGoal(u35, thomasDays, allDays), calcPersonalGoal(ue35, thomasDays, allDays), calcPersonalGoal(wb, thomasDays, allDays), calcPersonalGoal(tv, thomasDays, allDays), calcPersonalGoal(vvl, thomasDays, allDays), calcPersonalGoal(fn, thomasDays, allDays), thomas_u35, thomas_ue35, thomas_wb, thomas_tv, thomas_vvl, thomas_fn),
  new Employee('Niklas', niklasDays, calcPersonalGoal(u35, niklasDays, allDays), calcPersonalGoal(ue35, niklasDays, allDays), calcPersonalGoal(wb, niklasDays, allDays), calcPersonalGoal(tv, niklasDays, allDays), calcPersonalGoal(vvl, niklasDays, allDays), calcPersonalGoal(fn, niklasDays, allDays), niklas_u35, niklas_ue35, niklas_wb, niklas_tv, niklas_vvl, niklas_fn),
  new Employee('Eric', ericDays, calcPersonalGoal(u35, ericDays, allDays), calcPersonalGoal(ue35, ericDays, allDays), calcPersonalGoal(wb, ericDays, allDays), calcPersonalGoal(tv, ericDays, allDays), calcPersonalGoal(vvl, ericDays, allDays), calcPersonalGoal(fn, ericDays, allDays), eric_u35, eric_ue35, eric_wb, eric_tv, eric_vvl, eric_fn)];

  // Create table header
  const tableHeader = '<tr><th>Name</th><th>Tage</th><th>U35</th><th>Ü35</th><th>WB</th><th>TV</th><th>VVL</th><th>FN</th></tr>';

  // Create table rows
  let tableRows = '';
  for (const employee of employees) {
    const row = `<tr><td>${employee.name}</td><td>${employee.days}</td><td>${employee.u35}</td><td>${employee.ue35}</td><td>${employee.wb}</td><td>${employee.tv}</td><td>${employee.vvl}</td><td>${employee.fn}</td></tr>`;
    tableRows += row;
  }
  
  // Set table header and rows
  const employeesTable = document.getElementById('employeesTable');
  const employeesTableTitle = document.getElementById('employeesTableTitle');
  employeesTableTitle.innerHTML = "Tabelle ohne Rundungen";
  employeesTable.innerHTML = tableHeader + tableRows;

  array_u35 = [];
  array_ue35 = [];
  array_wb = [];
  array_tv = [];
  array_vvl = [];
  array_fn = [];
  array_u35_reached = [];
  array_ue35_reached = [];
  array_wb_reached = [];
  array_tv_reached = [];
  array_vvl_reached = [];
  array_fn_reached = [];

  for (const employee of employees) 
  {
    array_u35.push(employee.u35);
    array_ue35.push(employee.ue35);
    array_wb.push(employee.wb);
    array_tv.push(employee.tv);
    array_vvl.push(employee.vvl);
    array_fn.push(employee.fn);
    array_u35_reached.push(employee.u35_reached);
    array_ue35_reached.push(employee.ue35_reached);
    array_wb_reached.push(employee.wb_reached);
    array_tv_reached.push(employee.tv_reached);
    array_vvl_reached.push(employee.vvl_reached);
    array_fn_reached.push(employee.fn_reached);
  }

  array_u35_rounded = convertDoublesToIntegers(array_u35, u35);
  array_ue35_rounded = convertDoublesToIntegers(array_ue35, ue35);
  array_wb_rounded = convertDoublesToIntegers(array_wb, wb);
  array_tv_rounded = convertDoublesToIntegers(array_tv, tv);
  array_vvl_rounded = convertDoublesToIntegers(array_vvl, vvl);
  array_fn_rounded = convertDoublesToIntegers(array_fn, fn);

  i = 0;
  for (const employee of employees)
  {
    employee.u35 = array_u35_rounded[i];
    employee.ue35 = array_ue35_rounded[i];
    employee.wb = array_wb_rounded[i];
    employee.tv = array_tv_rounded[i];
    employee.vvl = array_vvl_rounded[i];
    employee.fn = array_fn_rounded[i];
    i++;
  }

    // Create table header
    const tableHeaderRounded = '<tr><th>Name</th><th>Tage</th><th>U35</th><th>Ü35</th><th>WB</th><th>TV</th><th>VVL</th><th>FN</th></tr>';

    // Create table rows
    let tableRowsRounded = '';
    for (const employee of employees) {
      const row = `<tr><td>${employee.name}</td><td>${employee.days}</td><td>${employee.u35}</td><td>${employee.ue35}</td><td>${employee.wb}</td><td>${employee.tv}</td><td>${employee.vvl}</td><td>${employee.fn}</td></tr>`;
      tableRowsRounded += row;
    }
    
    // Set table header and rows
    const employeesTableRounded = document.getElementById('employeesTableRounded');
    const employeesTableTitleRounded = document.getElementById('employeesTableTitleRounded');
    employeesTableTitleRounded.innerHTML = "Tabelle so fair wie möglich gerundet";
    employeesTableRounded.innerHTML = tableHeaderRounded + tableRowsRounded;

    total_ue35_reached = 0;
    total_u35_reached = 0;
    total_fn_reached = 0;
    total_tv_reached = 0;
    total_vvl_reached = 0;
    total_wb_reached = 0;


    // Create table header
    const tableHeaderFinal = 
    `<tr>
      <th></th>
      <th>Tage</th>
      <th>Ziel Ü35</th>
      <th>Ziel U35</th>
      <th>Ü35</th>
      <th>U35</th>
      <th>Ziel FN</th>
      <th>Festnetz</th>
      <th>Ziel TV</th>
      <th>Tv</th>
      <th>Ziel Vvl</th>
      <th>VVL</th>
      <th>Ziel WB/Upsell</th>
      <th>WB/Upsell</th>
    </tr>`;

    // Create table rows
    let tableRowsFinal = '';
    for (const employee of employees) 
    {
      const row = `<tr>
        <td>${employee.name}</td>
        <td>${employee.days}</td>
        <td>${employee.ue35}</td>
        <td>${employee.u35}</td>
        <td>${employee.ue35_reached}</td>
        <td>${employee.u35_reached}</td>
        <td>${employee.fn}</td>
        <td>${employee.fn_reached}</td>
        <td>${employee.tv}</td>
        <td>${employee.tv_reached}</td>
        <td>${employee.vvl}</td>
        <td>${employee.vvl_reached}</td>
        <td>${employee.wb}</td>
        <td>${employee.wb_reached}</td>
      </tr>`;

      total_ue35_reached += employee.ue35_reached;
      total_u35_reached += employee.u35_reached;
      total_fn_reached += employee.fn_reached;
      total_tv_reached += employee.tv_reached;
      total_vvl_reached += employee.vvl_reached;
      total_wb_reached += employee.wb_reached;

      tableRowsFinal += row;
    }

    // Shop (erreicht)
    tableRowsFinal += `<tr>
    <td>${"Shop (erreicht)"}</td>
    <td>${allDays}</td>
    <td>${totalColumn(array_ue35_rounded)}</td>
    <td>${totalColumn(array_u35_rounded)}</td>
    <td>${total_ue35_reached}</td>
    <td>${total_u35_reached}</td>
    <td>${totalColumn(array_fn_rounded)}</td>
    <td>${total_fn_reached}</td>
    <td>${totalColumn(array_tv_rounded)}</td>
    <td>${total_tv_reached}</td>
    <td>${totalColumn(array_vvl_rounded)}</td>
    <td>${total_vvl_reached}</td>
    <td>${totalColumn(array_wb_rounded)}</td>
    <td>${total_wb_reached}</td>
    </tr>`;

    // Differenz
    tableRowsFinal += `<tr>
    <td>${"Differenz"}</td>
    <td>${""}</td>
    <td>${"/"}</td>
    <td>${"/"}</td>
    <td>${-(ue35 - total_ue35_reached)}</td>
    <td>${-(u35 - total_u35_reached)}</td>
    <td>${"/"}</td>
    <td>${-(fn - total_fn_reached)}</td>
    <td>${"/"}</td>
    <td>${-(tv - total_tv_reached)}</td>
    <td>${"/"}</td>
    <td>${-(vvl - total_vvl_reached)}</td>
    <td>${"/"}</td>
    <td>${-(wb - total_wb_reached)}</td>
    </tr>`;

    // Erreicht
    tableRowsFinal += `<tr>
    <td>${"erreicht"}</td>
    <td>${""}</td>
    <td>${"/"}</td>
    <td>${"/"}</td>
    <td>${Math.round(total_ue35_reached / ue35 * 100) +"%"}</td>
    <td>${Math.round(total_u35_reached / u35 * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(total_fn_reached / fn * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(total_tv_reached / tv * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(total_vvl_reached / vvl * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(total_wb_reached / wb * 100) +"%"}</td>
    </tr>`;

    // Steigerung / Verlust
    tableRowsFinal += `<tr>
    <td>${"Steigerung/Verlust"}</td>
    <td>${""}</td>
    <td>${"/"}</td>
    <td>${"/"}</td>
    <td>${Math.round(-(ue35 - total_ue35_reached) / ue35 * 100) +"%"}</td>
    <td>${Math.round(-(u35 - total_u35_reached) / u35 * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(-(fn - total_fn_reached) / fn * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(-(tv - total_tv_reached) / tv * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(-(vvl - total_vvl_reached) / vvl * 100) +"%"}</td>
    <td>${"/"}</td>
    <td>${Math.round(-(wb - total_wb_reached) / wb * 100) +"%"}</td>
    </tr>`;    
        
    // Set table header and rows
    const employeesTableFinal = document.getElementById('tableFinal');
    const employeesTableTitleFinal = document.getElementById('lableFinal');
    employeesTableTitleFinal.innerHTML = "Finale Tabelle";
    employeesTableFinal.innerHTML = tableHeaderFinal + tableRowsFinal;
});