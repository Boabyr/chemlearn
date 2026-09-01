import type { FC } from 'react'
import FlameAas from './FlameAas'
import GraphiteFurnace from './GraphiteFurnace'
import IcpOes from './IcpOes'
import GasChromatograph from './GasChromatograph'
import Hplc from './Hplc'
import CapillaryElectrophoresis from './CapillaryElectrophoresis'

import UvVis from './UvVis'
import Fluorescence from './Fluorescence'
import Chemoluminescence from './Chemoluminescence'
import Ftir from './Ftir'
import Rfa from './Rfa'
import Xrd from './Xrd'
import Esca from './Esca'
import TwoElectrode from './TwoElectrode'
import ThreeElectrode from './ThreeElectrode'
import Coulometry from './Coulometry'
import Conductivity from './Conductivity'
import GlucoseSensor from './GlucoseSensor'
import Qcm from './Qcm'
import PotentiometricSensor from './PotentiometricSensor'
import OpticalSensor from './OpticalSensor'

/**
 * Bildet die Apparatur-IDs aus den Kursdaten auf Zeichnungen ab.
 * Neue Apparatur: Komponente anlegen, hier eintragen — die Kursdateien
 * enthalten selbst keine Grafik mehr, nur noch die ID.
 */
export const apparatusRegistry: Record<string, FC> = {
  'uv-vis': UvVis,
  'fluorescence': Fluorescence,
  'chemoluminescence': Chemoluminescence,
  'ftir': Ftir,
  'rfa': Rfa,
  'xrd': Xrd,
  'esca': Esca,
  'two-electrode': TwoElectrode,
  'three-electrode': ThreeElectrode,
  'coulometry': Coulometry,
  'conductivity': Conductivity,
  'glucose-sensor': GlucoseSensor,
  'qcm': Qcm,
  'potentiometric-sensor': PotentiometricSensor,
  'optical-sensor': OpticalSensor,
  'flame-aas': FlameAas,
  'graphite-furnace': GraphiteFurnace,
  'icp-oes': IcpOes,
  'gc': GasChromatograph,
  'hplc': Hplc,
  'capillary-electrophoresis': CapillaryElectrophoresis,
}

export function getApparatus(id: string): FC | undefined {
  const found = apparatusRegistry[id]
  if (!found && import.meta.env.DEV) {
    console.error(
      `[Apparatus] Keine Zeichnung für ID "${id}". ` +
      `Bekannt: ${Object.keys(apparatusRegistry).join(', ')}`
    )
  }
  return found
}
