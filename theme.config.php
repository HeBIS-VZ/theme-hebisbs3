<?php
use Zend\ServiceManager\ServiceManager;

return [
    "extends" => "bootstrap3",
    "css" => [
        'compiled.css',
        'icons.css'
    ],
    'js' => [
        'vendor/bootstrap.min.js',
        'vendor/bootstrap-accessibility.min.js',
        'hds_common.js'
    ],
    /*
    "less" => [
        "active" => true,
        "compiled.less"
    ],
    */
    'favicon' => 'hds-favicon.ico',

    'helpers' => [
        'factories' => [
            'config' => function(ServiceManager $sm) {
                return new Hebis\View\Helper\Hebisbs3\Options($sm);
            },
            'record' => 'Hebis\View\Helper\Root\Factory::getRecord',
            'citation' => 'Hebis\View\Helper\Root\Factory::getCitation',
            'searchmemory' => 'Hebis\View\Helper\Root\Factory::getSearchMemory',
        ]
    ]
];
