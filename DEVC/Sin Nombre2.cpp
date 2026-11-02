#include <stdio.h>
#include <string.h>

/*UNION CON CADA EXAMEN DE LABORATORIO COMO MIEMBRO CON SU PROPIO NOMBRE.
TODOS COMPARTEN LA MISMA MEMORIA: SOLO UNO ES VALIDO A LA VEZ.*/

union Analisis{
	int leucocitos;
	int plaquetas;
	float glucosa;
	float colesterol;
	float hemoglobina;
	char grupo_sanguineo;
};

/*INDICA CUAL MIEMBRO DE LA UNION ESTA ACTIVO*/
enum Examen{
	LEUCOCITOS, PLAQUETAS, GLUCOSA, COLESTEROL, HEMOGLOBINA, GRUPO_SANGUINEO
};

struct Resultado{
	enum Examen examen;
	union Analisis valor;
};

/*CAPTURA EL VALOR EN EL MIEMBRO DE LA UNION QUE CORRESPONDE*/
void capturar (struct Resultado *r) {
	switch (r->examen){
		case LEUCOCITOS:
			printf("Leucocitos (/uL): ");
			scanf("%d", &r->valor.leucocitos);
			break;
		case PLAQUETAS:
			printf("Plaquetas (/uL): ");
			scanf("%d", &r->valor.plaquetas);
			break;
		case GLUCOSA:
			printf("Glucosa (mg/dL): ");
			scanf("%f", &r->valor.glucosa);
			break;
		case COLESTEROL:
			printf("Colesterol (mg/dL): ");
			scanf("%f", &r->valor.colesterol);
			break;
		case HEMOGLOBINA:
			printf("Hemoglobina (g/dL): ");
			scanf("%f", &r->valor.hemoglobina);
			break;
		case GRUPO_SANGUINEO:
			printf("Grupo Sanguineo (A, B, O): ");
			scanf("%c", &r->valor.grupo_sanguineo);
			break;
	}
}

/*DEVUELCE TEXTO SEGUN EL RANGO DE REFERENCIA*/
const char *evaluar(float v, float min, float max){
	if(v < min) return "BAJO";
	if(v > max) return "ALTO";
	return "NORMAL";
}

/*MUESTRA EL RESULTADO LEYENDO EL MIENBRO CORRRECTO*/
void mostrar (const struct Resultado *r){
	switch(r->examen){
		case LEUCOCITOS:
			printf("Leucocitos	: %d /uL -> %s\n", r->valor.leucocitos,
			evaluar((float) r->valor.leucocitos, 4500, 11000));	
			break;
		case PLAQUETAS:
			printf("Plaquetas	: %d /uL -> %s\n", r->valor.plaquetas,
			evaluar((float) r->valor.plaquetas, 150000, 450000));	
			break;
		case GLUCOSA:
			printf("Glucosa	: %.2f mg/dL -> %s\n", r->valor.glucosa,
			evaluar(r->valor.glucosa, 70, 100));	
			break;
		case COLESTEROL:
			printf("Colesterol	: %.2f mg/dL -> %s\n", r->valor.colesterol,
			evaluar(r->valor.colesterol, 0, 200));	
			break;
		case HEMOGLOBINA:
			printf("Hemoglobina	: %.2f g/dL -> %s\n", r->valor.hemoglobina,
			evaluar(r->valor.hemoglobina, 12, 17.5f));	
			break;
		case GRUPO_SANGUINEO:
			printf("Grupo Sanguineo	: %c\n", r->valor.grupo_sanguineo);	
			break;
	}
}

int main(void){
	char paciente[50];
	int i;
	
	/*UN RESULTADO POR CADA EXAMEN, CADA UNO CON SU UNION*/
	struct Resultado resultados[] = {
		{LEUCOCITOS}, {PLAQUETAS}, {GLUCOSA},
		{COLESTEROL}, {HEMOGLOBINA}, {GRUPO_SANGUINEO}
	};
	
	int total =  sizeof(resultados) / sizeof(resultados[0]);
	
	printf("=== LABORATORIO CLINICO ===\n");
	printf("Nombre del paciente: ");
	fgets(paciente, sizeof(paciente), stdin);
	paciente[strcspn(paciente, "\n")] = '\0';
	
	printf("\n---Captura de resultados ---\n");
	for(i = 0; i < total; i++) capturar(&resultados[i]);
	
	printf("\nTamano de la union Analisis: %lu bytes\n",
		(unsigned long)sizeof(union Analisis));
	printf("Tamano de cada Resultado (examen + union): %lu bytes\n",
		(unsigned long)sizeof(struct Resultado));
	
	printf("\nNota: Los rangos son referenciales; la interpretacion la hace un medico.\n");
	return 0;
	
}






