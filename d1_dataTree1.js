const csvFile1 = document.getElementById("csvFile1");
const reader1 = new FileReader();



// 0. Define Columns & Grid
const columns1 = [

    { header: 'Path', name: 'path', rowSpan:true, },

    { header: 'Row Name', name: 'name', },

    { header: 'TM Library GUID', name: 'id', },    
    
    { header: 'State', name: 'state', align: 'right', 
    rowSpan:true, width: 70, sortable: true},

  ]


const grid1 = new tui.Grid({
  el: document.getElementById('grid1'),
  data: [],
  bodyHeight: 600,
  Width: 900,
  columns: columns1,

  treeColumnOptions: {
    name: 'path',
    useCascadingCheckbox: true,
  },
  columnOptions: {
    resizable: true
  },
  
  
  contextMenu: ({ rowKey, columnName }) => [
    [
      {
        name: 'collapse',
        label: 'Collapse Groups (-)',
        
        action: func_collapse,

      },

      {
        name: 'expand',
        label: 'Expand Groups (+)',
        
        action: func_expand,

      },
    ],
  ],
  
});



// 1. Create New Datagrid When Input Changed
csvFile1.addEventListener('change', func_getCsvFile);


function func_getCsvFile()
{      
  //console.clear();

  var gridData1 = [];

  grid1.clear();

  const input1 = csvFile1.files[0];
  console.log("Loaded Csv File: " + input1)

  reader1.readAsText(input1);

  reader1.onload = function (e) 
  {
      const text1 = e.target.result;

      var arrLine1 = text1.split('\n');


      var appendedData = null;

      // Manage Datas to Array
      for (var i=0; i<arrLine1.length; i++)
      {
          // Check if there's comma in the string then split
          var line1 = arrLine1[i];

          //var lines1 = line1.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Keeps special chars
          var lines1 = line1.split(','); // Ignore special chars

          // if split data still greater then 3 then ignore & warm
          if (lines1 == null || lines1.length != 3 
            || !lines1[0].includes('/TXT_UserLibrary')) 
            continue;
          

            appendedData = {path: lines1[0], name: lines1[1], id: lines1[2] } ;        
          


          //            
          if (appendedData != null)
            gridData1.push(appendedData);

      }

      localStorage.setItem("treeData1", JSON.stringify(gridData1));
      document.grid1 = grid1;

      // Manage Arrays to Group & Iterate Again to Tree
      var group1 = Object.groupBy(gridData1, ( {path} ) =>  path);
      

      console.log("Convert " + arrLine1.length + " Lines to " + 
      gridData1.length + " Data to " + Object.entries(group1).length  + " Groups: ");
      console.log( group1 );


      Object.keys(group1).forEach(key => 
      {        
        var child1 = [];


        var gp = group1[key];
        Object.keys(gp).forEach(key => 
        {

          var item = gp[key];

          child1.push({path: item['path'].replace('/TXT_UserLibrary', '..'),
           name: item['name'], id: item['id']})

    
        });
      
      
        var parent1 = 
        {
          path: key, _children: child1, _attributes: { expanded: true, },
        }
        
        grid1.appendRow(parent1);
    });

    
  };

}



// 2. Events for RMB Context Menu
function func_collapse()
{
  grid1.collapseAll();
}



function func_expand()
{  
  grid1.expandAll();
}



// 3. Events for Keyboard Input
document.addEventListener("keydown", (event) => 
{
    if (event.key === '+')
        grid1.expandAll();

    else if (event.key === '-')
        grid1.collapseAll();

})