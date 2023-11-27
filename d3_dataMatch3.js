var gridDiv1 = document.getElementById('grid1');
var gridDiv2 = document.getElementById('grid2');

const csvFile1 = document.getElementById("csvFile1");
const xlsFile2 = document.getElementById("xlsFile2");

var grid1, grid2;


// 1. Update Grid Tables When New File Imported
xlsFile2.addEventListener('change', func_getDataDelay);



function func_getDataDelay()
{
    console.clear();

    setTimeout( func_getStoredData, 300);

}


function func_getStoredData()
{
    var treeData1 = [];
    var gridData2 = []; 
    
    grid1 = document.grid1;
    grid2 = document.grid2;

    
    var data1 = grid1.getData();
    var data2 = grid2.getData();

    var match1 = [], match2 = [], match3 = [];


    // Get Data 3 (& 2)
    var data3 = data2.filter(e2 => !data1.some( e1 => e1.id == e2.id));
    
    data3 = Object.values(
        data3.reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {}));

    data3.forEach(data => { 
        var item1 = {path: data['path'], name: data['csvname'], id: data['id'], state: 3 }; 

        match3.push(item1);
     })



    // Get Data 1 (& 2)
    data1.forEach(data => {

        if (data2.some(e => e.id == data['id']) == false && data['id'] != null)
        {
            match1.push(data);
        }

    });


    // Get Data 2 & Splice 1 & 3
    match1.forEach(data1 => {
        
        match3.forEach(data3 => {
            
            if (data3.name == data1.name)
            {         
                match1.splice(match1.indexOf(data1), 1);
                match3.splice(match3.indexOf(data3), 1);
                
                match2.push(data1);

                return;
            }

        });

    });
    


    // Renew TreeData1
    grid1.clear();

    data1.forEach( data => {
        var item1 = {path: data['path'], name: data['name'], id: data['id'] }; 
        
        if (match1.some(e => e.id == data['id']) == true)
        {
            item1['state'] = 1;

        }
            
        else if (match2.some(e => e.name == data.name) == true)
        {
            item1['state'] = 2;
        }


        treeData1.push(item1);
    })

    match3.forEach( data => {        
        
        var item1 = {path: "#", name: data['name'], id: data['id'], state: 3 }; 


        treeData1.push(item1);
    })

    grid1.resetData(treeData1);



    // Renew GridData2
    grid2.clear();

    data2.forEach( data => {                
        var item1 = { code: data['code'], 
        csvname: data['csvname'], rvtname: data['rvtname'], id: data['id']
        , instance: data['instance'], condition: data['condition'], 
        filter: data['filter'], type: data['type'], 
        };

        if (item1['instance'] != "Instance") item1.instance = 'Copy';

        match2.forEach( e => {   
            if (e.id != data['id'] && e.name == data['csvname'])
            {

                item1['state'] = 2; item1['id'] = e.id;
            }

        })


        if (match3.some(e => e.id == data['id']) == true)
        {
            item1['state'] = 3; 

            if ( Array.from(item1['code'])[0] != '#')
                item1['code'] = "#" + item1['code'];
        }

        gridData2.push(item1);
    })


        match1.forEach(data => {
              
        var item1 = { code: '--', csvname: data['name'], rvtname: data['name'], id: data['id']
        , instance: 'Instance', condition: 'Contains', filter: 'Name', type: 'Material', state: 1
        };
    

        gridData2.push(item1);
    });
    

 
    
    grid2.resetData(gridData2);

}



