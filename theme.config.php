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
            'config' => 'Hebis\View\Helper\Hebisbs3\Factory::getConfig',
            'record' => 'Hebis\View\Helper\Root\Factory::getRecord',
            'citation' => 'Hebis\View\Helper\Root\Factory::getCitation',
            'searchmemory' => 'Hebis\View\Helper\Root\Factory::getSearchMemory',
            'multipartItems' => 'Hebis\View\Helper\Hebisbs3\Factory::getMultipartItems',
            'ppnlink' => 'Hebis\View\Helper\Hebisbs3\Factory::getPpnLink'
        ]
    ]
];
