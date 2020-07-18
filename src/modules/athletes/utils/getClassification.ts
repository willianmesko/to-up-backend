export const classification = (athlete_age : number, sexo: number, body_fat_percentage: number) => {

  if(sexo === 1) {
switch (athlete_age) {
     case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <13:
     'Muito baixo';
      break;
      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <=13 && body_fat_percentage <=16:
      'Excelente';
      break;
      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <=17 && body_fat_percentage <=19:
       'Muito bom';
      break;
      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <=20 && body_fat_percentage <=22:
      'Bom';
      break;
      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <=23 && body_fat_percentage <=25:
        'Adequado';
      break;

      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <=26 && body_fat_percentage <=28:
         'Moderamente alto';
      break;
      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage <=29 && body_fat_percentage <=31:
         'Alto';
      break;
      case athlete_age >=18 && athlete_age <=25 && body_fat_percentage >=32:
         'Muito alto';
      break;


      case athlete_age >=26 && athlete_age <=35 && body_fat_percentage <14:
         'Muito baixo';
      break;
      case athlete_age >=26 && athlete_age <=35 && body_fat_percentage <=14 && body_fat_percentage <=16:
         'Excelente';
      break;
      case athlete_age >=26 && athlete_age <=35  && body_fat_percentage <=17 && body_fat_percentage <=20:
         'Muito bom';
      break;
      case athlete_age >=26 && athlete_age <=35  && body_fat_percentage <=21 && body_fat_percentage <=23:
         'Bom';
      break;
      case athlete_age >=26 && athlete_age <=35  && body_fat_percentage <=24 && body_fat_percentage <=25:
         'Adequado';
      break;

      case athlete_age >=26 && athlete_age <=35 && body_fat_percentage <=26 && body_fat_percentage <=29:
         'Moderamente alto';
      break;
      case athlete_age >=26 && athlete_age <=35 && body_fat_percentage <=30 && body_fat_percentage <=33:
         'Alto';
      break;
      case athlete_age >=26 && athlete_age <=35 && body_fat_percentage >=34:
         'Muito alto';
      break;

      case athlete_age >=36 && athlete_age <=45 && body_fat_percentage <16:
         'Muito baixo';
      break;
      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage <=16 && body_fat_percentage <=19:
         'Excelente';
      break;
      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage <=20 && body_fat_percentage <=23:
         'Muito bom';
      break;
      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage <=24 && body_fat_percentage <=26:
         'Bom';
      break;
      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage <=27 && body_fat_percentage <=29:
         'Adequado';
      break;

      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage <=30 && body_fat_percentage <=32:
         'Moderamente alto';
      break;
      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage <=33 && body_fat_percentage <=36:
         'Alto';
      break;
      case  athlete_age >=36 && athlete_age <=45   && body_fat_percentage >=37:
         'Muito alto';
      break;


      case athlete_age >=46 && athlete_age <=55 && body_fat_percentage <17:
         'Muito baixo';
      break;
      case  athlete_age >=46 && athlete_age <=55    && body_fat_percentage <=17 && body_fat_percentage <=21:
         'Excelente';
      break;
      case   athlete_age >=46 && athlete_age <=55     && body_fat_percentage <=22 && body_fat_percentage <=25:
         'Muito bom';
      break;
      case   athlete_age >=46 && athlete_age <=55   && body_fat_percentage <=26 && body_fat_percentage <=28:
         'Bom';
      break;
      case   athlete_age >=46 && athlete_age <=55    && body_fat_percentage <=29 && body_fat_percentage <=31:
         'Adequado';
      break;

      case   athlete_age >=46 && athlete_age <=55    && body_fat_percentage <=32 && body_fat_percentage <=34:
         'Moderamente alto';
      break;
      case   athlete_age >=46 && athlete_age <=55     && body_fat_percentage <=35 && body_fat_percentage <=38:
         'Alto';
      break;
      case   athlete_age >=46 && athlete_age <=55     && body_fat_percentage >=39:
         'Muito alto';
      break;


      case athlete_age >=56 && athlete_age <=65 && body_fat_percentage <18:
         'Muito baixo';
      break;
      case  athlete_age >=56 && athlete_age <=65  && body_fat_percentage <=18 && body_fat_percentage <=22:
         'Excelente';
      break;
      case athlete_age >=56 && athlete_age <=65  && body_fat_percentage <=23 && body_fat_percentage <=26:
         'Muito bom';
      break;
      case  athlete_age >=56 && athlete_age <=65  && body_fat_percentage <=27 && body_fat_percentage <=29:
         'Bom';
      break;
      case athlete_age >=56 && athlete_age <=65   && body_fat_percentage <=30 && body_fat_percentage <=32:
         'Adequado';
      break;

      case  athlete_age >=56 && athlete_age <=65   && body_fat_percentage <=33 && body_fat_percentage <=35:
         'Moderamente alto';
      break;
      case  athlete_age >=56 && athlete_age <=65  && body_fat_percentage <=36 && body_fat_percentage <=38:
         'Alto';
      break;
      case  athlete_age >=56 && athlete_age <=65   && body_fat_percentage >=39:
         'Muito alto';
      break;


    default:
      break;
  }
}

if(sexo ===0) {
  switch (athlete_age) {
    case >=18 && <=25 && body_fat_percentage <13:
        'Muito baixo';
     break;
     case >=18 && <=25 && body_fat_percentage <=13 && body_fat_percentage <=16:
        'Excelente';
     break;
     case >=18 && <=25 && body_fat_percentage <=17 && body_fat_percentage <=19:
        'Muito bom';
     break;
     case >=18 && <=25 && body_fat_percentage <=20 && body_fat_percentage <=22:
        'Bom';
     break;
     case >=18 && <=25 && body_fat_percentage <=23 && body_fat_percentage <=25:
        'Adequado';
     break;

     case >=18 && <=25 && body_fat_percentage <=26 && body_fat_percentage <=28:
        'Moderamente alto';
     break;
     case >=18 && <=25 && body_fat_percentage <=29 && body_fat_percentage <=31:
        'Alto';
     break;
     case >=18 && <=25 && body_fat_percentage >=32:
        'Muito alto';
     break;


     case >=26 && <=35 && body_fat_percentage <14:
        'Muito baixo';
     break;
     case >=26 && <=35  && body_fat_percentage <=14 && body_fat_percentage <=16:
        'Excelente';
     break;
     case >=26 && <=35  && body_fat_percentage <=17 && body_fat_percentage <=20:
        'Muito bom';
     break;
     case >=26 && <=35  && body_fat_percentage <=21 && body_fat_percentage <=23:
        'Bom';
     break;
     case >=26 && <=35  && body_fat_percentage <=24 && body_fat_percentage <=25:
        'Adequado';
     break;

     case >=26 && <=35  && body_fat_percentage <=26 && body_fat_percentage <=29:
        'Moderamente alto';
     break;
     case >=26 && <=35  && body_fat_percentage <=30 && body_fat_percentage <=33:
        'Alto';
     break;
     case >=26 && <=35  && body_fat_percentage >=34:
        'Muito alto';
     break;

     case >=36 && <=45 && body_fat_percentage <16:
        'Muito baixo';
     break;
     case  >=36 && <=45   && body_fat_percentage <=16 && body_fat_percentage <=19:
        'Excelente';
     break;
     case  >=36 && <=45   && body_fat_percentage <=20 && body_fat_percentage <=23:
        'Muito bom';
     break;
     case  >=36 && <=45   && body_fat_percentage <=24 && body_fat_percentage <=26:
        'Bom';
     break;
     case  >=36 && <=45   && body_fat_percentage <=27 && body_fat_percentage <=29:
        'Adequado';
     break;

     case  >=36 && <=45   && body_fat_percentage <=30 && body_fat_percentage <=32:
        'Moderamente alto';
     break;
     case  >=36 && <=45   && body_fat_percentage <=33 && body_fat_percentage <=36:
        'Alto';
     break;
     case  >=36 && <=45   && body_fat_percentage >=37:
        'Muito alto';
     break;


     case >=46 && <=55 && body_fat_percentage <17:
        'Muito baixo';
     break;
     case  >=46 && <=55    && body_fat_percentage <=17 && body_fat_percentage <=21:
        'Excelente';
     break;
     case  >=46 && <=55    && body_fat_percentage <=22 && body_fat_percentage <=25:
        'Muito bom';
     break;
     case  >=46 && <=55   && body_fat_percentage <=26 && body_fat_percentage <=28:
        'Bom';
     break;
     case  >=46 && <=55    && body_fat_percentage <=29 && body_fat_percentage <=31:
        'Adequado';
     break;

     case  >=46 && <=55    && body_fat_percentage <=32 && body_fat_percentage <=34:
        'Moderamente alto';
     break;
     case  >=46 && <=55    && body_fat_percentage <=35 && body_fat_percentage <=38:
        'Alto';
     break;
     case  >>=46 && <=55    && body_fat_percentage >=39:
        'Muito alto';
     break;


     case >=56 && <=65 && body_fat_percentage <18:
        'Muito baixo';
     break;
     case  >=56 && <=65   && body_fat_percentage <=18 && body_fat_percentage <=22:
        'Excelente';
     break;
     case >=56 && <=65   && body_fat_percentage <=23 && body_fat_percentage <=26:
        'Muito bom';
     break;
     case  >=56 && <=65  && body_fat_percentage <=27 && body_fat_percentage <=29:
        'Bom';
     break;
     case  >=56 && <=65    && body_fat_percentage <=30 && body_fat_percentage <=32:
        'Adequado';
     break;

     case  >=56 && <=65    && body_fat_percentage <=33 && body_fat_percentage <=35:
        'Moderamente alto';
     break;
     case  >=56 && <=65  && body_fat_percentage <=36 && body_fat_percentage <=38:
        'Alto';
     break;
     case  >=56 && <=65   && body_fat_percentage >=39:
        'Muito alto';
     break;


   default:
     break;
 }

}

}



