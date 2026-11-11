import React, { useState } from 'react';
import { Sliders, RefreshCw, Trophy, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { PATH_SCORES_DATA, DEFAULT_WEIGHTS } from '../data/executiveDeliverables';
import { ScoringWeights, PathScoreBreakdown } from '../types/business';

interface DecisionMatrixViewProps {
  onSelectWinningPath: (pathCode: string) => void;
}

export const DecisionMatrixView: React.FC<DecisionMatrixViewProps> = ({
  onSelectWinningPath,
}) => {
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);

  const calculateWeightedScore = (item: PathScoreBreakdown, w: ScoringWeights) => {
    const totalWeight =
      w.revenuePotential +
      w.timeToFirstSale +
      w.initialInvestment +
      w.competitiveEnvironment +
      w.executionDifficulty;

    const raw =
      item.categoryScores.revenuePotential * (w.revenuePotential / 100) +
      item.categoryScores.timeToFirstSale * (w.timeToFirstSale / 100) +
      item.categoryScores.initialInvestment * (w.initialInvestment / 100) +
      item.categoryScores.competitiveEnvironment * (w.competitiveEnvironment / 100) +
      item.categoryScores.executionDifficulty * (w.executionDifficulty / 100);

    // Normalize if weights don't equal 100 exactly
    if (totalWeight === 0) return 0;
    return (raw * 100) / totalWeight;
  };

  const sortedPaths = [...PATH_SCORES_DATA].sort(
    (a, b) => calculateWeightedScore(b, weights) - calculateWeightedScore(a, weights)
  );

  const totalWeightSum =
    weights.revenuePotential +
    weights.timeToFirstSale +
    weights.initialInvestment +
    weights.competitiveEnvironment +
    weights.executionDifficulty;

  const resetWeights = () => setWeights(DEFAULT_WEIGHTS);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Deliverable 08 · Decision Matrix & Mathematical Scoring
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white mt-1">
          Weighted Multi-Criteria Evaluation & Sensitivity Engine
        </h2>
        <p className="text-xs lg:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Standard decision framework weights: Revenue Potential (30%), Time to First Sale (25%), Initial Investment (20%), Competitive Environment (15%), Execution Difficulty (10%). Adjust sliders to stress-test rankings.
        </p>
      </div>

      {/* Dynamic Weight Sliders Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Weight Sensitivity Controls
            </h3>
            <span className="text-xs text-slate-400">
              Total Weight Sum: {totalWeightSum}% {totalWeightSum !== 100 && '(Normalized automatically)'}
            </span>
          </div>

          <button
            onClick={resetWeights}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Standard Weights</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs">
          {/* Revenue */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-slate-300">Revenue Potential</span>
              <span className="text-emerald-400 font-mono font-bold">
                {weights.revenuePotential}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={weights.revenuePotential}
              onChange={(e) =>
                setWeights({ ...weights, revenuePotential: Number(e.target.value) })
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Standard: 30%</div>
          </div>

          {/* Time to First Sale */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-slate-300">Time to First Sale</span>
              <span className="text-indigo-400 font-mono font-bold">
                {weights.timeToFirstSale}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={weights.timeToFirstSale}
              onChange={(e) =>
                setWeights({ ...weights, timeToFirstSale: Number(e.target.value) })
              }
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Standard: 25%</div>
          </div>

          {/* Initial Investment */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-slate-300">Initial Investment</span>
              <span className="text-emerald-400 font-mono font-bold">
                {weights.initialInvestment}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weights.initialInvestment}
              onChange={(e) =>
                setWeights({ ...weights, initialInvestment: Number(e.target.value) })
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Standard: 20%</div>
          </div>

          {/* Competitive Environment */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-slate-300">Competitive Env</span>
              <span className="text-amber-400 font-mono font-bold">
                {weights.competitiveEnvironment}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={weights.competitiveEnvironment}
              onChange={(e) =>
                setWeights({ ...weights, competitiveEnvironment: Number(e.target.value) })
              }
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Standard: 15%</div>
          </div>

          {/* Execution Difficulty */}
          <div className="space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-slate-300">Execution Ease</span>
              <span className="text-slate-300 font-mono font-bold">
                {weights.executionDifficulty}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={weights.executionDifficulty}
              onChange={(e) =>
                setWeights({ ...weights, executionDifficulty: Number(e.target.value) })
              }
              className="w-full accent-slate-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Standard: 10%</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Dynamic Ranked Leaderboard
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Scores dynamically recalculated (0-100)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 text-center">Rank</th>
                <th className="py-3 px-4">Opportunity</th>
                <th className="py-3 px-4">Group</th>
                <th className="py-3 px-4 text-right">Revenue (30%)</th>
                <th className="py-3 px-4 text-right">Time-to-Sale (25%)</th>
                <th className="py-3 px-4 text-right">Investment (20%)</th>
                <th className="py-3 px-4 text-right">Competition (15%)</th>
                <th className="py-3 px-4 text-right">Execution (10%)</th>
                <th className="py-3 px-4 text-right text-white">Weighted Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedPaths.map((path, idx) => {
                const finalScore = calculateWeightedScore(path, weights);
                const isWinner = idx === 0;

                return (
                  <tr
                    key={path.id}
                    className={`transition-colors ${
                      isWinner
                        ? 'bg-emerald-950/20 hover:bg-emerald-950/30 font-medium'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-xs inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          isWinner
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {path.name}
                        {isWinner && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-normal">
                            Winner
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-sm">
                        {path.keyAdvantage}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {path.pathGroup}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {path.categoryScores.revenuePotential}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {path.categoryScores.timeToFirstSale}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {path.categoryScores.initialInvestment}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {path.categoryScores.competitiveEnvironment}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                      {path.categoryScores.executionDifficulty}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`font-mono text-sm font-extrabold ${
                          isWinner ? 'text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        {finalScore.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rationale Dossier Cards for each candidate */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Individual Candidate Scoring Rationales
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {sortedPaths.map((path) => (
            <div
              key={path.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{path.name}</span>
                <span className="font-mono text-emerald-400 font-bold">
                  Score: {calculateWeightedScore(path, weights).toFixed(1)} / 100
                </span>
              </div>

              <div className="space-y-1.5 text-slate-300">
                <div>
                  <strong className="text-slate-200">Revenue (Score {path.categoryScores.revenuePotential}):</strong>{' '}
                  {path.rationales.revenuePotential}
                </div>
                <div>
                  <strong className="text-slate-200">Time to First Sale (Score {path.categoryScores.timeToFirstSale}):</strong>{' '}
                  {path.rationales.timeToFirstSale}
                </div>
                <div>
                  <strong className="text-slate-200">Initial Investment (Score {path.categoryScores.initialInvestment}):</strong>{' '}
                  {path.rationales.initialInvestment}
                </div>
                <div>
                  <strong className="text-slate-200">Competitive Moat (Score {path.categoryScores.competitiveEnvironment}):</strong>{' '}
                  {path.rationales.competitiveEnvironment}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400">
                <strong>Primary Vulnerability:</strong> {path.primaryVulnerability}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
