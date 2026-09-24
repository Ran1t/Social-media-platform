import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('posts')
  console.log(user)

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center font-sans">
        <p className="animate-pulse text-sm">Loading profile...</p>
      </div>
    )
  }

  // Purely dynamic values directly mapped from backend schema
  const postsList = user.posts || []
  const reelsList = user.reels || []
  const followersCount = user.followers?.length || 0
  const followingsCount = user.followings?.length || 0

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name || 'User'
  )}&background=6366f1&color=fff`

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Main Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 opacity-80" />

          {/* Profile Details */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-12 gap-4">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <div className="relative">
                  <img
                    src={user.profileImage || defaultAvatar}
                    alt={user.name || 'User Profile'}
                    className="w-28 h-28 rounded-2xl object-cover ring-4 ring-slate-950 bg-slate-800 shadow-xl"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>

                <div className="space-y-1 mb-1">
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    {user.name}
                  </h1>
                  <p className="text-sm font-medium text-indigo-400">
                    @{user.username}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 active:scale-95 cursor-pointer">
                  Edit Profile
                </button>
                <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700 active:scale-95 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Real Stats Array Counts */}
            <div className="grid grid-cols-4 gap-2 mt-6 pt-6 border-t border-slate-800 text-center">
              <div className="p-2 rounded-xl bg-slate-950/40">
                <span className="block text-xl font-bold text-white">{postsList.length}</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Posts</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/40">
                <span className="block text-xl font-bold text-white">{reelsList.length}</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Reels</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/40">
                <span className="block text-xl font-bold text-white">{followersCount}</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Followers</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/40">
                <span className="block text-xl font-bold text-white">{followingsCount}</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Following</span>
              </div>
            </div>

            {user.createdAt && (
              <p className="text-xs text-slate-500 text-center sm:text-right mt-4">
                Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
              activeTab === 'posts'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Posts ({postsList.length})
          </button>
          <button 
            onClick={() => setActiveTab('reels')}
            className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
              activeTab === 'reels'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Reels ({reelsList.length})
          </button>
        </div>

        {/* Dynamic Content Grid */}
        <div className="mt-4">
          {activeTab === 'posts' && (
            postsList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {postsList.map((post, index) => (
                  <div key={post._id || index} className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:opacity-90 transition cursor-pointer">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt="Post media" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs p-4 text-center">
                        {post.caption || 'Post content'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                <p className="text-slate-500 text-sm">No posts uploaded yet.</p>
              </div>
            )
          )}

          {activeTab === 'reels' && (
            reelsList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {reelsList.map((reel, index) => (
                  <div key={reel._id || index} className="aspect-[9/16] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:opacity-90 transition cursor-pointer">
                    {reel.videoUrl ? (
                      <video src={reel.videoUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs p-2 text-center">
                        Reel video
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                <p className="text-slate-500 text-sm">No reels uploaded yet.</p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile