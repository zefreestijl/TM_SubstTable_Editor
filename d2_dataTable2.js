var grid1 = document.getElementById('grid1');
var grid2 = document.getElementById('grid2');

const csvFile1 = document.getElementById("csvFile1");
const xlsFile2 = document.getElementById("xlsFile2");

var btn_expand1 = document.getElementById('btn_expand1');
var btn_export2 = document.getElementById('btn_export2');



// 0. Define Columns & Grid
var gridData1 = [];


const columns1 = [
    
    { 
        header: 'State', name: 'state', 
        align: 'center',
        sortable: true, disabled: true,
        width: 50,
    },

    { 
        header: '#Row ID', name: 'code',  filter: 'select',
        rowSpan:false, width: 70, editor: 'text',
        
    },
    { header: 'Row Name', name: 'csvname', sortable: true,  filter: 'text', disabled: true,  },

    { header: 'Substitution Type', name: 'type',width: 120, align: 'center',
    defaultValue: 'Material', disabled: true, hidden: true  },

    { header: 'Filter', name: 'filter',width: 120, defaultValue: 'Name', 
    disabled: true, hidden: true, align: 'center', },
    
    { 
        header: 'Condition', name: 'condition', 
        hidden: true, align: 'center',
        filter: 'select',width: 120,
        formatter: 'listItemText',        

        defaultValue: 'Contains',
        editor: 
        { type: 'select', 
            
            options: 
            { listItems: 
                [ 
                { text: 'Contains', value: 'Contains' }, 
                { text: 'Equals', value: 'Equals' }, 
                { text: 'Starts With', value: '1' }, 
                { text: 'Ends With', value: '2' }, 
                { text: 'Match', value: 'Match' }, 
                { text: 'Not Contains', value: '3' }, 
                { text: 'Not Equals', value: '4' }, 
                { text: 'Not Starts With', value: '5' }, 
                { text: 'Not Ends With', value: '6' }, 
                { text: 'Not Match', value: '7' }, 
                ]
            }
        }
    },


    { header: 'Value', name: 'rvtname', editor: 'text', filter: 'select',  },
    { header: 'TM Library GUID', name: 'id', hidden: true, disabled: true, filter: 'text'},    

    { 
        header: 'Instance Type', name: 'instance', hidden: true, 
        defaultValue: 'Instance', align: 'center',
        filter: 'select', width: 120,
        formatter: 'listItemText',        

        editor: 
        { type: 'select', 
            
            options: 
            { listItems: 
                [ 
                { text: 'Instance', value: 'Instance' }, { text: 'Copy', value: 'Copy' }, 
                ]
            }
        }
    },

  ]



const grid = new tui.Grid({
  el: document.getElementById('grid2'),
  data: gridData1,  
  rowHeight: 30,
  bodyHeight: 600,
  columns: columns1,
  draggable: true,

  rowHeaders: ['checkbox'],

  
  contextMenu: ({ rowKey, columnName }) => [
    [
        
      {
        name: 'uncheck',
        label: 'Uncheck All (Esc)',
        
        action: () => {
            grid.uncheckAll();
          },

      },

      {
        name: 'insert',
        label: '(Insert) Checked Row',
        
        action: func_addRow,

      },

      {
        name: 'delete',
        label: '(Delete) Checked Row',
        
        action: func_removeRow,

      },
    ],
  ],
});



// 1. Delay Create a Blank Table List After DataTree1 Loaded
csvFile1.addEventListener('change', func_getDataDelay);

function func_getDataDelay()
{
    console.clear();

    setTimeout( func_getCsvFile, 300);

    btn_expand1.style.opacity = 1;
    btn_expand1.style.borderStyle = 'solid';

    btn_export2.style.opacity = .5;
    btn_export2.style.borderStyle = 'hidden';

    
}


function func_getCsvFile()
{
    grid.clear();
    gridData1 = [];

    //var grid1 = JSON.parse(localStorage.getItem("treeData1"));
    var grid1 = document.grid1.getData();


    grid1.forEach(data => {
        
        if (data['name'] == null) return;
        
        var item1 = { code: '--', csvname: data['name'], rvtname: data['name'], id: data['id']
        , instance: 'Instance', condition: 'Contains', filter: 'Name', type: 'Material', 
        };

        gridData1.push(item1);

    });


    
    grid.resetData(gridData1);
}



// 2. Function to Expand & Show Full Match Table
btn_expand1.addEventListener('click', func_expandTable);

var opt1 = 
{
    row: { even: { background: '#f0f0f0' } },
    cell: { normal: { background: '#fbfbfb', 
    border: '#e0e0e0', showVerticalBorder: true }}
};

function func_expandTable()
{
    if (grid1.style.display === "none")
    {
        grid1.style.display = "block";
        grid2.style.width = 50 + "%";
        grid.hideColumn("id", "true");
        grid.hideColumn("instance", "true");
        grid.hideColumn("type", "true");
        grid.hideColumn("condition", "true");
        grid.hideColumn("filter", "true");
        
        
        tui.Grid.applyTheme('default', '');

        btn_expand1.innerHTML = " Expand Match Table ";
        btn_expand1.style.opacity = 1;
        btn_expand1.style.borderStyle = 'solid';

        btn_export2.style.opacity = .5;
        btn_export2.style.borderStyle = 'hidden';

    }

    else
    {
        grid1.style.display = "none";
        grid2.style.width = 100 + "%";
        grid.showColumn("id", "true");
        grid.showColumn("instance", "true");
        grid.showColumn("type", "true");
        grid.showColumn("condition", "true");
        grid.showColumn("filter", "true");

        tui.Grid.applyTheme('default', opt1);
        
        btn_expand1.innerHTML = " Collapse Match Table ";
        btn_expand1.style.opacity = .5;
        btn_expand1.style.borderStyle = 'hidden';

        btn_export2.style.opacity = 1;
        btn_export2.style.borderStyle = 'solid';

    }
    
    

    grid.setWidth(grid2.offsetWidth);
}



// 3. Function to Insert or Delete Checked Rows
function func_addRow()
{
    gridData1 = grid.getData();

    var col0 = grid.getIndexOfColumn(grid.getFocusedCell()['columnName']);
    var arr1 = grid.getCheckedRowKeys();

    if (arr1.length == 0) 
    {
        arr1.push(grid.getFocusedCell()['rowKey']);
        
    }

    for (var i = arr1.length -1; i >= 0; i--)
    {
        var rowKey1 = arr1[i];
        var index1 = grid.getIndexOfRow(rowKey1);

        var data = gridData1[index1];

        var item1 = { code: data['code'], state : data['state'], 
        csvname: data['csvname'], rvtname: '--', id: data['id']
        , instance: data['instance'], condition: data['condition'], 
        filter: data['filter'], type: data['type'], 
        };

        grid.uncheck(rowKey1);

        grid.appendRow(item1, {at:index1+1});      
        var row1 = grid.getRowAt(index1+1);

        grid.check(row1['rowKey']);

        if (arr1.length > 1 && i == arr1.length -1)
        {
            grid.focusAt(index1+1, col0);
        }
            

        else if (arr1.length == 1)
            grid.focusAt(index1+1+i, col0);
    }

    gridData1 = grid.getData();

    var index0 = grid.getIndexOfRow(grid.getFocusedCell()['rowKey']);
    grid.setSelectionRange({start: [index0, 0], end: [index0, grid.getColumns().length]});

}



function func_removeRow()
{   
    gridData1 = grid.getData();

    var arr1 = grid.getCheckedRowKeys();

    if (arr1.length == 0) 
    {
        arr1.push(grid.getFocusedCell()['rowKey']);
        
    }


    for (var i = arr1.length -1; i >= 0; i--)
    {
        var rowKey1 = arr1[i];

        grid.uncheck(rowKey1);

        grid.removeRow(rowKey1);

    }

    gridData1 = grid.getData();
}



// 4. Event Handlers for Advanced Control
var isEditing1 = false;

grid.on('editingStart', ev=>{ isEditing1 = true; });

grid.on('editingFinish', ev=>{ isEditing1 = false; });



// 4a. Auto Check Picked Rows
grid.on('mousedown', ev => 
{    
    //console.log( ev['columnName'] );
    
    if (ev['nativeEvent'].buttons != 1 || ev['rowKey'] == null 
    || ev['columnName'] == '_checked' || ev['columnName'] == '_draggable' ||
     grid.getSelectionRange() != null) 
        return;

    else if ( ev['columnName'] == 'rvtname' )
    {
        grid.startEditing(ev['rowKey'], 'rvtname');
        return;
    }

    else if ( ev['columnName'] == 'code' )
    {
        grid.startEditing(ev['rowKey'], 'code');
        return;
    }


    //
    var row1 = grid.getRow(ev['rowKey']);
    

    if (row1['_attributes']['checked'] === true)
        grid.uncheck(ev['rowKey']);
    else
        grid.check(ev['rowKey']);


});


// 4aa. Auto Check Picked Ranges & Clear Previous Checks
document.addEventListener('mouseup', (event) => 
{
    if (gridData1.length == 0) return;

    
    var arrRange1 = grid.getSelectionRange();

    if (arrRange1 != null) 
    {
        grid.uncheckAll();
    
        var index0 = arrRange1['start'][0];
        var index1 = arrRange1['end'][0];
    
        if (index0 > index1)
        {
            var swap1 = index0; index0 = index1; index1 = swap1;
        }
            
        grid.checkBetween(grid.getRowAt(index0)['rowKey'], grid.getRowAt(index1)['rowKey']);
    

    }

});



// 4c. Save History Data for Undo / Redo
var historyData1 = [];
var currentStep1 = 0;




// 4b. Shortcut for Clear / Insert / Delete Checks
document.addEventListener("keydown", (event) => 
{
    if (isEditing1) return;


    if ( historyData1.length > 0 )
    {

        if (event.ctrlKey && event.key === 'z' && currentStep1 < historyData1.length )
        {    
            grid.clear();              
            grid.resetData(historyData1[currentStep1]);
            
            console.log(" ↚  RollBack Step: "  + (currentStep1+1) + " / " + historyData1.length);
            currentStep1++;
    
            return;
        } 
    
        else if (event.ctrlKey  && event.key === 'y' && currentStep1 > 1)
        {
            grid.clear();
            
            if (currentStep1 > 1)
                grid.resetData(historyData1[currentStep1-2]);

            /*
            else
                grid.resetData(historyData1[0]);
            */

            console.log(" ↛  Forward Step: "  + (currentStep1-1) + " / " + historyData1.length);
            currentStep1--;

            return;
        }
    
    }


    //
    var gridData0 = grid.getData();
    gridData1 = grid.getData();

    var col0 = grid.getIndexOfColumn(grid.getFocusedCell()['columnName']);
    var row0 = grid.getFocusedCell()['rowKey'];
    var index0 = grid.getIndexOfRow(row0);

    var arrChecks1 = grid.getCheckedRows();


    //
    if (event.key === 'Delete' || event.key === 'Insert')
    {
        if (event.key === 'Delete')
        {            
            if (grid.getFocusedCell()['columnName'] == 'rvtname')
            {        
                grid.startEditing(grid.getFocusedCell()['rowKey'], 'rvtname');        
                return;
            }

            if (arrChecks1 == null)
                grid.removeRow(row0);

            else
                func_removeRow();


            if (gridData1.length > 0 && row0 != null)
                grid.focusAt(index0, col0);

            grid.uncheckAll();
        }

        else if (event.key === 'Insert')
        {        
            if (grid.getFocusedCell()['rowKey'] == null) return;
            
            func_addRow();
                
        }


        if (historyData1.length > 20)
            historyData1.pop();
        
        historyData1.splice(0, currentStep1);
        currentStep1 = 0;

        historyData1.unshift(gridData0);
        //console.log( historyData1.length + " / " +gridData0.length)
    }
    

    else if (event.key === 'Escape')
    {        
        grid.uncheckAll();
        
    }


    gridData1 = grid.getData();

   
});



// 4bb. Auto Check for Arrow Up / Down
document.addEventListener('keyup', (event) => 
{
    if (event.key == 'Escape' || event.key == 'Delete'
    || event.key != 'ArrowUp' && event.key != 'ArrowDown') return;

    var arrRange1 = grid.getSelectionRange();
    if (arrRange1 == null )
    {
        grid.uncheckAll();
        
        var row1 = grid.getFocusedCell()['rowKey'];
        grid.check(row1);

        
        return;
    }
        

    if (event.key != 'ArrowUp'&& event.key != 'ArrowDown') return;

    grid.uncheckAll();

    var index0 = arrRange1['start'][0];
    var index1 = arrRange1['end'][0];

    if (index0 > index1)
    {
        var swap1 = index0; index0 = index1; index1 = swap1;
    }
        
    grid.checkBetween(grid.getRowAt(index0)['rowKey'], grid.getRowAt(index1)['rowKey']);
    
    
    
});





// 5. Function to Export Edited Table to Excel File
btn_export2.addEventListener('click', func_exportExcel);


function func_exportExcel()
{
    grid.export('xls', 
    { 
        includeHeader: true,
        useFormattedValue: true,
        includeHiddenColumns: true,
        onlyFiltered: false,

        columnNames: ['code', 'csvname', 'type', 'filter', 
        'condition', 'rvtname', 'id', 'instance', ]
     }
    );
}



// 6. Save Current Data When Manually Loaded Match Table
xlsFile2.addEventListener('change', func_getXlsFile);

function func_getXlsFile()
{
    grid.clear();
    gridData1 = [];

    
    const input1 = xlsFile2.files[0];

    const reader = new FileReader();
    if (reader.readAsBinaryString) 
    {
        reader.onload = (e) => 
        {
            const workbook = XLSX.read(reader.result, {type: 'binary'});
            const firstSheet = workbook.SheetNames[0];
            const rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

            rows.forEach(row1 => {

                if (row1['#Row ID'] == '#') return;

                var item1 = 
                { 
                    code: row1['#Row ID'], 
                    csvname: row1['Row Name'],
                    type: row1['Substitution Type'],
                    filter: row1['Filter'],
                    condition: row1['Condition'],
                    rvtname: row1['Value'],
                    id: row1['TM Library GUID'],
                    instance: row1['Instance Type'],
                };
        
                gridData1.push(item1);
        
            });

            
            
            grid.resetData(gridData1);
            
            console.log("Loaded xls File: " + input1.name + " (" + gridData1.length + ")")
            
            
            localStorage.setItem("gridData1", JSON.stringify(gridData1));
            document.grid2 = grid;
        };
        reader.readAsBinaryString(input1);
    }

}

