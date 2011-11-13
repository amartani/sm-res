$(function(){
  jQuery("#list_consumo").jqGrid({
    datatype: "local",
    height:   300,
    colNames:['ID', 'Mes', 'Dia', 'Hora', 'Ponto de Consumo', 'Tipo do PC', 'Consumo', 'Total'],
    colModel:[
      {name:'ID',                index:'ID',                width:30,  align:'center', sorttype:"int"},
      {name:'Mes',               index:'Mes',               width:50,  align:'center', sorttype:"text"},
      {name:'Dia',               index:'Dia',               width:70,  align:'center', sorttype:"date"},
      {name:'Hora',              index:'Hora',              width:50,  align:'center', sorttype:"text"},
      {name:'Ponto de Consumo',  index:'Ponto de Consumo',  width:100, align:'center', sorttype:"int"},
      {name:'Tipo do PC',        index:'Tipo do PC',        width:100, align:'center', sortable:"int"},
      {name:'Consumo',           index:'Consumo',           width:100, align:'center', sorttype:"int"},
      {name:'Total',             index:'Total',             width:100, align:'center', sorttype:"int"}
    ],
    multiselect: true,
    caption:     "Smart Meter Residencial",
    pager:       '#pager_consumo',
    rowNum:      50
  });

  jQuery("#list_bateria").jqGrid({
    datatype: "local",
    height: 300,
      colNames:['ID', 'Mes', 'Dia', 'Hora', 'Carga'],
      colModel:[
        {name:'ID',    index:'ID',    width:30,  align:'center', sorttype:"int"},
        {name:'Mes',   index:'Mes',   width:50,  align:'center', sorttype:"text"},
        {name:'Dia',   index:'Dia',   width:70,  align:'center', sorttype:"date"},
        {name:'Hora',  index:'Hora',  width:50,  align:'center', sorttype:"text"},
        {name:'Carga', index:'Carga', width:100, align:'center', sorttype:"int" }
      ],
      multiselect: true,
      caption:     "Carga da Bateria",
      pager:       '#pager_bateria',
      rowNum:      50
  });

  jQuery.ajax({
    url: "consumo.csv",
    context: document.body,
    success: function(data){
      var csv_data = jQuery.csv()(data);

      var last_batery_time;
      for(var i = 0; i < csv_data.length-1; i++){
        var mes;
        if(csv_data[i][2] == 'Jan'){ mes = '01' }
        if(csv_data[i][2] == 'Feb'){ mes = '02' }
        if(csv_data[i][2] == 'Mar'){ mes = '03' }
        if(csv_data[i][2] == 'Apr'){ mes = '04' }
        if(csv_data[i][2] == 'May'){ mes = '05' }
        if(csv_data[i][2] == 'Jun'){ mes = '06' }
        if(csv_data[i][2] == 'Jul'){ mes = '07' }
        if(csv_data[i][2] == 'Aug'){ mes = '08' }
        if(csv_data[i][2] == 'Sep'){ mes = '09' }
        if(csv_data[i][2] == 'Oct'){ mes = '10' }
        if(csv_data[i][2] == 'Nov'){ mes = '11' }
        if(csv_data[i][2] == 'Dec'){ mes = '12' }

        row = {
          'ID':               parseInt(csv_data[i][0]),
          'Mes':              csv_data[i][2],
          'Dia':              (csv_data[i][1]+"-"+mes+"-"+csv_data[i][3]),
          'Hora':             csv_data[i][4],
          'Ponto de Consumo': parseInt(csv_data[i][6]),
          'Tipo do PC':       parseInt(csv_data[i][7]),
          'Consumo':          parseInt(csv_data[i][8]),
          'Total':            parseInt(csv_data[i][9])
        };

        jQuery("#list_consumo").jqGrid('addRowData', i+1, row);

        if(last_batery_time != csv_data[i][4]){
          last_batery_time = csv_data[i][4];
          row = {
            'ID':    parseInt(csv_data[i][0]),
            'Mes':   csv_data[i][2],
            'Dia':   (csv_data[i][1]+"-"+mes+"-"+csv_data[i][3]),
            'Hora':  csv_data[i][4],
            'Carga': parseInt(csv_data[i][5])
          }

          jQuery("#list_bateria").jqGrid('addRowData', i+1, row);
        }
      }
    },
    error: function(){
      alert("Problema com dados de consumo");
    }
  });

});