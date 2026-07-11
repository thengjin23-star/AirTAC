export interface CylinderModel {
  id: string;
  series: string;
  model: string;
  boreSize: string;
  actionType: string;
  fluid: string;
  operatingPressure: string;
  proofPressure: string;
  temperature: string;
  speed: string;
  cushion: string;
  portSize: string;
}

export const defaultSCDatabase: CylinderModel[] = [
  { id: '1', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '32', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~800 mm/s', cushion: '可調緩衝', portSize: 'PT1/8' },
  { id: '2', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '40', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~800 mm/s', cushion: '可調緩衝', portSize: 'PT1/4' },
  { id: '3', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '50', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~800 mm/s', cushion: '可調緩衝', portSize: 'PT1/4' },
  { id: '4', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '63', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~800 mm/s', cushion: '可調緩衝', portSize: 'PT3/8' },
  { id: '5', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '80', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~800 mm/s', cushion: '可調緩衝', portSize: 'PT3/8' },
  { id: '6', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '100', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~800 mm/s', cushion: '可調緩衝', portSize: 'PT1/2' },
  { id: '7', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '125', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~500 mm/s', cushion: '可調緩衝', portSize: 'PT1/2' },
  { id: '8', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '160', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~500 mm/s', cushion: '可調緩衝', portSize: 'PT3/4' },
  { id: '9', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '200', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~500 mm/s', cushion: '可調緩衝', portSize: 'PT3/4' },
  { id: '10', series: 'SC', model: 'SC, SCD, SCJ', boreSize: '250', actionType: '復動型', fluid: '空氣(經40μm以上濾網過濾)', operatingPressure: '0.15~1.0MPa', proofPressure: '1.5MPa', temperature: '-20~70℃', speed: '30~500 mm/s', cushion: '可調緩衝', portSize: 'PT1' },
];
