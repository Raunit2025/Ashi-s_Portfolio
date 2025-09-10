// src/components/Background3D.jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { MathUtils } from 'three'

const Stars = () => {
  const ref = useRef()

  // Generate stars once
  const positions = useMemo(
    () => random.inSphere(new Float32Array(5000 * 3), { radius: 2 }),
    []
  )

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 30
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const BackgroundScene = ({ isFlying }) => {
  useFrame((state) => {
    const targetZ = isFlying ? 2 : 3
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 0.015)

    const targetFov = isFlying ? 90 : 30
    state.camera.fov = MathUtils.lerp(state.camera.fov, targetFov, 0.0015)

    state.camera.position.y = MathUtils.lerp(state.camera.position.y, 0, 0.05)
    state.camera.updateProjectionMatrix()
  })

  return (
    <>
      <ambientLight intensity={1.5} />
      <Stars />
    </>
  )
}

export default BackgroundScene
