export default function CardKPI ({ kpi }) {
    return (
        <div className="w-full bg-white p-md rounded-md border-surface">
            <div className="w-full flex items-center justify-between mb-md">
                <span className="w h center rounded-full bg-surface" style={{"--w": "50px", "--h": "50px"}}>{kpi.ico}</span>
                <span className="text-success text-sm font-medium">{kpi.stats.state === 'up' ? '+' : '-'}{kpi.stats.value}</span>
            </div>
            <p className="text-xs text-on-surface-variant">{kpi.sub}</p>
            <h3 className="text-2xl font-bold my-sm">{kpi.tit}</h3>
            {kpi.progressbar ? (
                <progress value={kpi.bar.value} max={kpi.bar.total} />
            ) : (
                <p className="text-xs text-on-surface-variant">{kpi.label}</p>
            )}
        </div>
    )
}