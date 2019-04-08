const Rectangle = require('../rectangle');

describe('Тестовый набор для Rectangle', () => {
    let x1, x2, y1, y2;

    beforeEach(() => {
        x1 = 0;
        y1 = 0;
        x2 = 3;
        y2 = 2;
    });

    describe('>> модуль', () => {
        it('должен импортировать функцию', () => {
            expect(typeof Rectangle).toBe('function');
        });
    });

	describe('>> конструктор', () => {
        it('должен принимать числа', () => {
            let rect = new Rectangle(x1, y1, x2, y2);

            expect(rect.x1).toEqual(x1);
            expect(rect.x2).toEqual(x2);
            expect(rect.y1).toEqual(y1);
            expect(rect.y2).toEqual(y2);
        });

        it('должен приводить параметры к числовому типу', () => {
            x1 = x1.toString();
            y1 = y1.toString();
            x2 = x2.toString();
            y2 = y2.toString();

            let rect = new Rectangle(x1, y1, x2, y2);

            expect(rect.x1).toEqual(parseInt(x1));
            expect(rect.x2).toEqual(parseInt(x2));
            expect(rect.y1).toEqual(parseInt(y1));
            expect(rect.y2).toEqual(parseInt(y2));
        });

        it('должен бросать исключение, если точки одинаковые', () => {
            expect(() => {
                new Rectangle(x1, y1, x1, y1);
            }).toThrowError(/Точки совпадают/);
        });

        it('должен бросать исключение, если любой из параметров не может быть приведен к числу', () => {
            expect(() => {
                new Rectangle('asd', y1, x2, y2);
            }).toThrowError(/Разрешены только числа/);
        });
    });

    describe('>> методы width и height', () => {
        it('должны вычислять соответствующие величины', () => {
            let rect = new Rectangle(x1, y1, x2, y2);

            let width = Math.abs(x1 - x2),
                height = Math.abs(y1 - y2);

            expect(rect.width()).toEqual(width);
            expect(rect.height()).toEqual(height);
        });

        it('должны вычислять соответствующие величины вне зависимости от порядка точек', () => {
            let rect1 = new Rectangle(x1, y1, x2, y2),
                rect2 = new Rectangle(x2, y2, x1, y1);

            let width = Math.abs(x1 - x2),
                height = Math.abs(y1 - y2);

            expect(rect1.width()).toEqual(width);
            expect(rect2.width()).toEqual(width);
            expect(rect1.height()).toEqual(height);
            expect(rect2.height()).toEqual(height);
        });
    });

    describe('>> метод isSquare', () => {
        it('должен возвращять true, если стороны равны', () => {
            y2 = 3;

            let rect = new Rectangle(x1, y1, x2, y2);

            expect(rect.isSquare()).toBe(true);
        });

        it('должен возвращять false, если стороны неравны', () => {
            let rect = new Rectangle(x1, y1, x2, y2);

            expect(rect.isSquare()).toBe(false);
        });
    });
});