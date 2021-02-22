export class SuppliesUtils {
    static STATES_EMPLOYEES = ['Activo', 'Inactivo'];
    static AREAS_EMPLOYEES = [
        'Administración',
        'Financiera',
        'Compras',
        'Infraestructura',
        'Operación',
        'Talento Humano',
        'Servicios Varios'
    ];

    static TYPE_ID_EMPLOYEES = [
        'Cédula de Ciudadanía',
        'Cédula de Extranjería',
        'Pasaporte',
        'Permiso Especial',
    ];

    static COUNTRIES = ['Colombia', 'Estados Unidos'];
    static dateToNumber(data: string | Date | number): number {
        return new Date(data).getTime();
    }

    static generateEmail(email) {
        
    }
}