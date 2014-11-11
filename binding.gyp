{
  "targets": [
    {
      "target_name": "nodeledscape",
      "sources": [ "nodeledscape.cc" ],
      "libraries": [ "../ledscape/ledscape.o", 
                     "../ledscape/pru.o",
                     "../ledscape/am335x/app_loader/interface/prussdrv.o" ],
      "comment": {
        'include_dirs': [
          '../ledscape',
        ],
        'link_settings': {
          'library_dirs': [
            '../ledscape',
          ],
        },
      }
    }
  ],
  'xcode_settings': {
  	'MACOSX_DEPLOYMENT_TARGET': '10.9',
  },
}