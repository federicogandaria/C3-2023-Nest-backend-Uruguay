//Id = uuid, paginationDto, dataRangeDto

import { IsOptional, IsUUID } from "class-validator";
import { PaginationDto } from './pagination.dto';
import { DataRangeDto } from './dataRange.dto';

export class HistoryDto{

    @IsUUID()
    id:String;

    @IsOptional()
    pagination?: PaginationDto
    
    @IsOptional()
    dataRange?: DataRangeDto
}