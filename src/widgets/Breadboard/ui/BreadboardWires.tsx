import { FC } from 'react';
import { Wire } from '@/entities/wire';
import { useSelectWire } from '@/features/wire/selectWire/model/useSelectWire';
import { useSplitWire } from '@/features/wire/splitWire/model/useSplitWire';
import { useAppSelector } from '@/shared/model';

export const BreadboardWires: FC = () => {
  const wires = useAppSelector((state) => state.wire.wires);
  const selectedWireId = useAppSelector((state) => state.wire.selectedWireId);

  const { selectWire } = useSelectWire();
  const { splitWire } = useSplitWire();
  return wires.map((wire) => (
    <Wire
      key={wire.id}
      wire={wire}
      selectedWireId={selectedWireId}
      onClick={() => selectWire(wire.id)}
      onDoubleClick={({ clientX, clientY }) => splitWire({ wireId: wire.id, clientX, clientY })}
    />
  ));
};
