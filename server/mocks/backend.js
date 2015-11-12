module.exports = function(app) {
    var express = require('express');
    var backendRouter = express.Router();

    //get address autocomplete
    backendRouter.get('/address-autocomplete', function(req, res) {
        var addrValue = req.query.addr.toLowerCase();
        var addresses = [
            {
                address: 'просп. Миру, 60',
                latitude: 46.941441,
                longitude: 32.057921
            },
            {
                address: 'вул. Космонавтів, 106',
                latitude: 46.954639,
                longitude: 32.066454
            },
            {
                address: 'просп. Леніна, 173',
                latitude: 46.964598,
                longitude: 32.016394
            },
            {
                address: 'вул. Пушкінська, 20',
                latitude: 46.969647,
                longitude: 31.98302
            },
            {
                address: 'просп. Жовтневий, 43',
                latitude: 46.941655,
                longitude: 32.037371
            }
        ];
        var autocompleteResults = [];
        
        autocompleteResults = addresses.filter(function(address) {
            return address.address.toLowerCase().indexOf(addrValue) > -1;
        });
        
        res.send({
            'addresses': autocompleteResults
        });
    });
    
    //get routes
    backendRouter.get('/safe-routes', function(req, res) {
        var routes = [
            {
                status: 'danger',
                waypoints: [
                    {
                        latitude: 46.962225,
                        longitude: 32.001872
                    }
                ],
                accidents: [
                    {
                        address: 'вул. Чигрина, 218',
                        latitude: 46.958056,
                        longitude: 32.023012,
                        wounded: 7,
                        deceased: 3
                    },
                    
                    {
                        address: 'вул. Чигрина, 77',
                        latitude: 46.957826,
                        longitude: 32.010568,
                        wounded: 4,
                        deceased: 0
                    }
                ]
            },
            {
                status: 'medium',
                waypoints: [
                    {
                        latitude: 46.961953,
                        longitude: 32.012593
                    }
                ],
                accidents: [
                    {
                        address: '8-а Поздовжня вул., 4',
                        latitude: 46.955345,
                        longitude: 32.045642,
                        wounded: 2,
                        deceased: 1
                    }
                ]
            },
            {
                status: 'safe',
                waypoints: [
                    {
                        latitude: 46.968263,
                        longitude: 32.011538
                    }
                ],
                accidents: [
                    {
                        address: 'вул. Чигрина, 77',
                        latitude: 46.957826,
                        longitude: 32.010568,
                        wounded: 4,
                        deceased: 0
                    }
                ]
            }
        ];
        
        res.send({
            'routes': routes
        });
    });

    app.use('/api', backendRouter);
};
