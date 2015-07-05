angular.module('PlatypusLab')

    .run(['$httpBackend', function ($httpBackend) {
        var list = [{
                            _id: '1',
                            name: 'Perry',
                            picture: 'img/pictures/perry.jpg',
                            info: 'Agent P.'
                        },
                        {
                            _id: '2',
                            name: 'Noah',
                            picture: 'img/pictures/noah.jpg',
                            info: 'PlatyArk'
                        },
                        {
                            _id: '3',
                            name: 'Lindsay',
                            picture: 'img/pictures/lindsay.jpg',
                            info: 'PlatyGirl'
                        },
                        {
                            _id: '4',
                            name: 'Robert',
                            picture: 'img/pictures/robert.jpg',
                            info: 'PlatyBaratheon'
                        },
                        {
                            _id: '5',
                            name: 'Spencer',
                            picture: 'img/pictures/spencer.jpg',
                            info: 'PlatyMark'
                        },
                        {
                            _id: '6',
                            name: 'Billy',
                            picture: 'img/pictures/billy.jpg',
                            info: 'PlatyTheKid'
                        },
                        {
                            _id: '7',
                            name: 'Harry',
                            picture: 'img/pictures/harry.jpg',
                            info: 'PlatyPotter'
                        },
                        {
                            _id: '8',
                            name: 'Bobby',
                            picture: 'img/pictures/bobby.jpg',
                            info: 'PlatyJerk'
                        },
                        {
                            _id: '9',
                            name: 'Sono',
                            picture: 'img/pictures/sono.jpg',
                            info: 'Platy'
                        },
                        {
                            _id: '10',
                            name: 'Beakbird',
                            picture: 'img/pictures/beakbird.jpg',
                            info: 'Platypus'
                        }];
        $httpBackend
            .whenGET('http://localhost:3000/platypuses')
            .respond(list);

        $httpBackend
            .whenGET(/http:\/\/localhost:3000\/platypuses\/\d+/)
            .respond(function (method, url) {
                var parts = url.split('/');
                var id = parts[parts.length - 1];
                for (var i in list) {
                    if (list[i]._id === id) return [200, list[i], {
                        'Cache-Control': 'max-age=60'
                    }];
                }
                return [404];
            });

        $httpBackend
            .whenDELETE(/http:\/\/localhost:3000\/platypuses\/\d+/)
            .respond(function (method, url) {
                var parts = url.split('/');
                var id = parts[parts.length - 1];
                for (var i in list) {
                    if (list[i]._id === id) {
                        list.splice(i, 1);
                        return [204];
                    }
                }
                return [204];
            });

        $httpBackend
            .whenPOST('http://localhost:3000/platypuses')
            .respond(function (method, url, data) {
                var pl = angular.fromJson(data);
                pl._id = list.length + 1;
                list.push(pl);
                return [200, pl, {}];
            });

        $httpBackend.whenGET(/^templates\/.*/).passThrough();
        $httpBackend.whenGET(/^\img\/.*/).passThrough();
    }]);