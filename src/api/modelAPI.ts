import axios from 'api/axios'
import { Station } from 'api/stationAPI'

export interface ModelValue {
  datetime: string
  temperature: number
  bias_adjusted_temperature: number
  relative_humidity: number
  bias_adjusted_relative_humidity: number
  wind_direction: number
  wind_speed: number
  total_precipitation: number
  dew_point: number
  accumulated_rain: number
  accumulated_snow: number
  accumulated_freezing_rain: number
  accumulated_ice_pellets: number
  cloud_cover: number
  sea_level_pressure: number
  wind_speed_40m: number
  wind_direction_40m: number
  wind_direction_80m: number
  wind_speed_120m: number
  wind_direction_120m: number
  wind_speed_925mb: number
  wind_direction_925mb: number
  wind_speed_850mb: number
  wind_direction_850m: number
}

export interface Model {
  station: Station
  values: ModelValue[]
}

export interface ModelsResponse {
  predictions: Model[]
}

export async function getModels(stationCodes: number[]): Promise<Model[]> {
  const url = '/models/GDPS/predictions/'

  const { data } = await axios.post<ModelsResponse>(url, {
    stations: stationCodes
  })

  return data.predictions
}

export interface ModelSummary {
  datetime: string
  tmp_tgl_2_5th: number
  tmp_tgl_2_median: number
  tmp_tgl_2_90th: number
  rh_tgl_2_5th: number
  rh_tgl_2_median: number
  rh_tgl_2_90th: number
}

interface ModelInfo {
  name: string
  abbrev: string
}

interface ModelRunInfo {
  datetime: string
  name: string
  abbreviation: string
}

// List of model summaries for each datetime with model & station info
export interface ModelSummariesForStation {
  station: Station
  model: ModelInfo | null
  values: ModelSummary[]
}

export interface ModelRun {
  model_run: ModelRunInfo
  values: ModelValue[]
}

export interface ModelsForStation {
  station: Station
  model_runs: ModelRun[]
}

export interface HistoricModelsForStation {
  station: Station
  model: ModelInfo | null
  values: ModelValue[]
}

export interface ModelSummariesResponse {
  summaries: ModelSummariesForStation[]
}

export interface HistoricModelsResponse {
  predictions: HistoricModelsForStation[]
}

export interface BiasAdjustedModelResponse {
  stations: ModelsForStation[]
}

export async function getModelSummaries(
  stationCodes: number[],
  model: 'GDPS'
): Promise<ModelSummariesForStation[]> {
  const url = `/models/${model}/predictions/summaries/`
  const { data } = await axios.post<ModelSummariesResponse>(url, {
    stations: stationCodes
  })

  return data.summaries
}

export async function getMostRecentHistoricModelPredictions(
  stationCodes: number[],
  model: 'GDPS'
): Promise<HistoricModelsForStation[]> {
  const url = `/models/${model}/predictions/historic/most_recent/`
  const { data } = await axios.post<HistoricModelsResponse>(url, {
    stations: stationCodes
  })

  return data.predictions
}

export async function getBiasAdjustedModelPredictions(
  stationCodes: number[],
  model: 'GDPS'
): Promise<ModelsForStation[]> {
  const url = `/models/${model}/predictions/most_recent/`
  const { data } = await axios.post<BiasAdjustedModelResponse>(url, {
    stations: stationCodes
  })

  return data.stations
}
